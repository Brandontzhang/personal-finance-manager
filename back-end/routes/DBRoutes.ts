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

router.post('/add-user', async (req, res) => {
  console.log("Adding user");
  const { username, email, auth0_user_id } = req.body;

  if (!username || !email) {
    res.status(400).json({
      error: 'Username and email required'
    });
  }

  try {
    const result = pool.query(
      `INSERT INTO users (username, email, auth0_user_id) VALUES ($1, $2) RETURNING *`,
      [username, email, auth0_user_id]
    );

    res.status(201).json({
      user: result[0]
    });
  } catch (err) {
    if (err.code === '23505') {
      res.status(409).json({
        "error": "Email already exists"
      })
    }

    res.status(500).json({
      "error": "Internal server error",
      message: err
    })
  };
});

router.get('/get-users', (_req, res) => {
  const users = pool.query('SELECT * FROM users');

  res.send(users);
});
