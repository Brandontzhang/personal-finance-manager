import express from "express";
import axios from 'axios';
import moment from 'moment';
import { Configuration, PlaidApi, Products, PlaidEnvironments } from 'plaid';

export const router = express.Router();

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || 'sandbox';

const PLAID_PRODUCTS = (process.env.PLAID_PRODUCTS || Products.Transactions).split(',',);
const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || 'US').split(',',);
const PLAID_REDIRECT_URI = process.env.PLAID_REDIRECT_URI || '';

let ACCESS_TOKEN = "";
let USER_TOKEN = null;
let PUBLIC_TOKEN = null;
let ITEM_ID = null;
let ACCOUNT_ID = null;

const configuration = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
      'PLAID-SECRET': PLAID_SECRET,
      'Plaid-Version': '2020-09-14',
    },
  },
});

const client = new PlaidApi(configuration);

// Plaid Auth - get token
router.post('/api/create_link_token', async (_req, res) => {
  const configs: any = {
    user: {
      client_user_id: 'user-id'
    },
    client_name: 'PFM',
    products: PLAID_PRODUCTS,
    country_codes: PLAID_COUNTRY_CODES,
    language: 'en',
    redirect_uri: PLAID_REDIRECT_URI,
  }

  if (PLAID_PRODUCTS.includes(Products.Statements)) {
    const statementConfig = {
      end_date: moment().format('YYYY-MM-DD'),
      start_date: moment().subtract(30, 'days').format('YYYY-MM-DD'),
    }
    configs.statements = statementConfig;
  }

  try {
    const createTokenResponse = await client.linkTokenCreate(configs);
    res.json(createTokenResponse.data);
  } catch (err) {
    console.log(err);
  }
});

router.post('/api/set_access_token', async (req, res) => {
  try {
    const body = {
      "client_id": PLAID_CLIENT_ID,
      "secret": PLAID_SECRET,
      "public_token": req.body.public_token
    }

    const { data } = await axios.post(
      "https://sandbox.plaid.com/item/public_token/exchange",
      body,
      {
        headers: {
          'Content-type': 'application/json'
        }
      }
    );

    const { access_token, item_id } = data;

    ACCESS_TOKEN = access_token;
    ITEM_ID = item_id;

    res.json({ public_token_exchange: 'complete' });
  } catch (err) {
    console.log(err);
  }
});

// Store in secure persistent data store
router.get('/api/accounts', async (_req, res) => {
  try {
    const accounts = await client.accountsGet({
      access_token: ACCESS_TOKEN
    });

    res.json(accounts);
  } catch (err) {
    res.send(err);
  }
});
