import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbInit } from './db/dbInit';
import { productsController } from './controllers/products';
import { phonesController } from './controllers/phones';
import { tabletsController } from './controllers/tablets';
import { accessoriesController } from './controllers/accessories';

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
app.use(express.static(__dirname + '/public'));

app.get('/products', productsController.getProducts);
app.get('/products/discount', productsController.getWithDiscount);

app.get('/phones', productsController.getProducts);
app.get('/phones/new', phonesController.getNew);
app.get('/phones/:id', phonesController.getById);
app.get('/phones/:id/recommended', phonesController.getRecommended);

app.get('/tablets', productsController.getProducts);
app.get('/tablets/new', tabletsController.getNew);
app.get('/tablets/:id', tabletsController.getById);
app.get('/tablets/:id/recommended', tabletsController.getRecommended);

app.get('/accessories', productsController.getProducts);
app.get('/accessories/new', accessoriesController.getNew);
app.get('/accessories/:id', accessoriesController.getById);
app.get('/accessories/:id/recommended', accessoriesController.getRecommended);

app.listen(3000, () => {
  console.log(`Server works on ${process.env.SERVER_HOST}:${process.env.PORT}`);
});
