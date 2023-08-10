import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbInit } from './db/dbInit';
import { productsController } from './controllers/products';
import { phonesController } from './controllers/phones';
import { tabletsController } from './controllers/tablets';
import { accessoriesController } from './controllers/accessories';
import { initRelations } from './db/initRelations';
import { router as userRouter } from './routes/user';

dbInit();
initRelations();

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
// Routing
app.use('/user', userRouter);

app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));

app.get('/products', productsController.getProducts);
app.get('/products/discount', productsController.getWithDiscount);
app.get('/products/new', productsController.getNew);
app.get('/products/search', productsController.getSearch);

app.get('/phones', productsController.getProducts);
app.get('/phones/:id', phonesController.getById);
app.get('/phones/:id/recommended', phonesController.getRecommended);

app.get('/tablets', productsController.getProducts);
app.get('/tablets/:id', tabletsController.getById);
app.get('/tablets/:id/recommended', tabletsController.getRecommended);

app.get('/accessories', productsController.getProducts);
app.get('/accessories/:id', accessoriesController.getById);
app.get('/accessories/:id/recommended', accessoriesController.getRecommended);

app.listen(3000, () => {
  console.log(`Server works on ${process.env.SERVER_HOST}:${process.env.PORT}`);
});
