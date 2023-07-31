import { Request, Response } from 'express';
import { Product } from '../models/product.model';

export async function getProducts(req: Request, res: Response) {
  const pageNumber: number = parseInt(req.query.page as string) || 1;
  const pageSize: number = parseInt(req.query.size as string) || 10;

  try {
    const productsOnPage = await Product.findAll();

    res.send({ message: 'Sucsess', productsOnPage });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
}
