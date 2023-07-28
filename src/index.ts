import express from 'express';
import cors from 'cors';
import {getProducts} from './controllers/phone';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

app.get('/products', getProducts);

app.listen(3000, () => {
  console.log(`Server works on ${process.env.SERVER_HOST}:${process.env.PORT}`);
});
