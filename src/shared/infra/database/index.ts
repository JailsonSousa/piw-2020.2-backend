import mongoose from 'mongoose';

const { DB_URL } = process.env;

/* mongoose.connect(
  `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
  { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
); */

mongoose.connect(`${DB_URL}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', () => console.error('connection error:'));
mongoose.connection.once('open', () => console.log('database connected'));
