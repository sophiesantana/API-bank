import 'reflect-metadata';
import express from 'express';
import InicializationDatabase from './database/inicializationDatabase';
import routes from './routes';
require('dotenv').config();

const app = express();

app.use(express.json());

app.use(routes);

const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  InicializationDatabase;
});