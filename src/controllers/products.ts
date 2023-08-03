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

const getDiscount = async (req: Request, res: Response) => {
  try {
    const discountedProducts = await productService.getByDiscount(100);

    res.send(discountedProducts);
  } catch (error) {
    console.error('Error fetching discounted products:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const productsController = {
  getProducts,
  getDiscount,
};
