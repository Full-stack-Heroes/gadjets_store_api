import {Request, Response} from 'express';
import {getProductsOnPage} from '../models/phone';
import {Phone} from '../types/phone';

export function getProducts(req: Request, res: Response) {
  const pageNumber: number = parseInt(req.query.page as string) || 1;
  const pageSize: number = parseInt(req.query.size as string) || 10;

  const productsOnPage: Phone[] = getProductsOnPage(pageNumber, pageSize);
  res.json(productsOnPage);
}
