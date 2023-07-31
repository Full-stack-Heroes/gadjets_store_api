import express from 'express';
import cors from 'cors';
import { getProducts } from './controllers/phone';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/products', getProducts);

app.listen(3000, () => {
  console.log(`Server works on ${process.env.SERVER_HOST}:${process.env.PORT}`);
});
