import dotenv from 'dotenv';
dotenv.config();

import '../database';

import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import routes from './routes';

import 'express-async-errors';

import '../../container/index';

const { SERVER_PORT } = process.env;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.listen(SERVER_PORT, () => {
  console.log(`Server started on port ${SERVER_PORT}! ✅`);
});
