import { Request, Response } from 'express';
import { productService } from '../services/product.service';

async function getProducts(req: Request, res: Response) {
  // const pageNumber: number = parseInt(req.query.page as string) || 1;
  // const pageSize: number = parseInt(req.query.size as string) || 10;

  try {
    const productsOnPage = await productService.getAll();

    res.send(productsOnPage);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
}

export const productsController = {
  getProducts,
};
