import { Request, Response } from 'express';
import { productService } from '../services/product.service';
import { FindOptions } from 'sequelize';

async function getProducts(req: Request, res: Response) {
  try {
    const { productType, page, limit } = req.query;
    const isDefaultRoot = req.path === '/products';

    const findOptions: FindOptions = {};

    if (isDefaultRoot && productType) {
      findOptions.where = { category: productType };
    }

    if (!isDefaultRoot) {
      const categoryFromPath = req.path.slice(1);
      console.log(categoryFromPath);
      findOptions.where = { category: categoryFromPath };
    }

    if (page) {
      const defaultAmmount = 12;
      const itemsByPage = Number(limit) || defaultAmmount;
      const offset = (Number(page) - 1) * itemsByPage;
      findOptions.offset = offset;
      findOptions.limit = itemsByPage;
    }

    const productsOnPage = await productService.getAllByOptionsCount(
      findOptions
    );

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
