import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { Configuration, PlaidApi, Products, PlaidEnvironments } from 'plaid';
import axios from 'axios';

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const APP_PORT = process.env.APP_PORT || 8000;
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || 'sandbox';


const PLAID_PRODUCTS = (process.env.PLAID_PRODUCTS || Products.Transactions).split(',',);
const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || 'US').split(',',);
const PLAID_REDIRECT_URI = process.env.PLAID_REDIRECT_URI || '';

// Store in secure persistent data store
let ACCESS_TOKEN = null;
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

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.post('/api/create_link_token', async (req, res) => {
  const configs = {
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

app.post('/api/set_access_token', async (req, res) => {
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

app.get('/api/accounts', async (req, res, next) => {
  try {
    const accountsResponse = await client.accountsGet({
      access_token: ACCESS_TOKEN,
    });

    res.json(accountsResponse.data);
  } catch (err) {
    return res.json(err.response);
  }
});

// Start the server
app.listen(APP_PORT, () => {
  console.log(`Server listening on port ${APP_PORT}`);
});
