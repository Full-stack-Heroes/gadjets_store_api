import { Request, Response } from 'express';
import { Product } from '../models/product.model';
import { ProductsInfo } from '../models/phones.model';

async function getProducts(req: Request, res: Response) {
  const pageNumber: number = parseInt(req.query.page as string) || 1;
  const pageSize: number = parseInt(req.query.size as string) || 10;

  try {
    const productsOnPage = await Product.findAll();

    res.send(productsOnPage);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function getProductData (req: Request, res: Response) {
  const { id } = req.params;

  try {
    const foundedProductData = await ProductsInfo.findByPk(id);

    if (!foundedProductData) {
      res.status(400).send({ error: 'Cannot find this item by ID' });

      return;
    }

    res.send(foundedProductData);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
}

export const productsController = {
  getProducts,
  getProductData,
};
