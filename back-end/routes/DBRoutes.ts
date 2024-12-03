import express from "express";
import axios from 'axios';
import moment from 'moment';
import dotenv from 'dotenv';
import pg from 'pg';

export const router = express.Router();
const { Pool } = pg;

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
