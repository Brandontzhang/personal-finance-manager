import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import { router as plaidRoutes } from './routes/PlaidRoutes';
import { router as dbRoutes } from './routes/DBRoutes';

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

app.use('/plaid', plaidRoutes);
app.use('/', dbRoutes);

// Start the server
app.listen(APP_PORT, () => {
  console.log(`Server listening on port ${APP_PORT}`);
});
