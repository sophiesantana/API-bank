import 'reflect-metadata';
import express from 'express';
import InicializationDatabase from './database/inicializationDatabase';

const app = express();

app.use(express.json());

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  InicializationDatabase;
});