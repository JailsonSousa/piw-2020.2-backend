import dotenv from 'dotenv';
dotenv.config();

import '../database';

import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import routes from './routes';

import 'express-async-errors';

import '../../container/index';

const { PORT } = process.env;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.listen(PORT || 3000, () => {
  console.log(`Server started on port ${PORT || 3000}! ✅`);
});
