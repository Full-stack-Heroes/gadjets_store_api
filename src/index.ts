import express from 'express';
import cors from 'cors';
import { getProducts } from './controllers/phone';
import dotenv from 'dotenv';
import path from 'path';
import { dbInit } from './db/dbInit';

dotenv.config();
const app = express();
dbInit();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

app.use(express.static('public'));
app.use('/images', express.static(__dirname + '/images'));

app.get('/products', getProducts);

app.listen(3000, () => {
  console.log(`Server works on ${process.env.SERVER_HOST}:${process.env.PORT}`);
});
