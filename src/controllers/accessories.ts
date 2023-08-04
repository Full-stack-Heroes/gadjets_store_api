import { Request, Response } from 'express';
import { Accessories } from '../models/accessories.model';
import { productService } from '../services/product.service';
import { Product } from '../models/product.model';

const CATEGORY_NAME = 'accessories';

const getAll = async (req: Request, res: Response) => {
  try {
    const accessories = await productService.getAllByCategory(CATEGORY_NAME);

    res.send(accessories);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const accessoriesInfo = await Accessories.findByPk(id, {
      include: {
        model: Product,
        as: 'productItemInfo'
      }
    });

    if (!accessoriesInfo) {
      res.status(404).send({ message: 'Cannot find Accessory with this ID' });

      return;
    }

    res.send(accessoriesInfo);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getRecommended = async (req: Request, res: Response) => {
  const { id } = req.params;
  const LIMIT = 5;

  try {
    const accessory = await Accessories.findByPk(id);

    if (!accessory) {
      res.status(404).send({ message: 'Cannot find Accessory with this ID' });
      return;
    }

    const recommendedAccessories = await productService.getRecomended(
      accessory.id,
      CATEGORY_NAME,
      LIMIT
    );

    res.send(recommendedAccessories);
  } catch (error) {
    console.error('Error fetching recommended accessories:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getNew = async (req: Request, res: Response) => {
  const limit = 10;

  try {
    const newAccessories = await productService.getNew(CATEGORY_NAME, limit);

    res.send(newAccessories);
  } catch (error) {
    console.error('Error fetching new accessories:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const accessoriesController = {
  getAll,
  getById,
  getRecommended,
  getNew,
};
