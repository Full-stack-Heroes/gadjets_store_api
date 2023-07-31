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

const test_path = path.join(__dirname, 'public');

app.use(express.static(test_path));
console.log(test_path);

app.get('/products', getProducts);

app.listen(3000, () => {
  console.log(`Server works on ${process.env.SERVER_HOST}:${process.env.PORT}`);
});
