import { Request, Response } from 'express';
import { Phones } from '../models/phones.model';
import { productService } from '../services/product.service';

const CATEGORY_NAME = 'phones';

const getAll = async (req: Request, res: Response) => {
  try {
    const phones = await productService.getAllByCategory(CATEGORY_NAME);

    res.send(phones);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const phoneInfo = await Phones.findByPk(id);

    if (!phoneInfo) {
      res.status(404).send({ message: 'Cannot find Phone with this ID' });
      return;
    }

    res.send(phoneInfo);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getRecommended = async (req: Request, res: Response) => {
  const { id } = req.params;
  const LIMIT = 8;

  try {
    const phone = await Phones.findByPk(id);

    if (!phone) {
      res.status(404).send({ message: 'Cannot find Phone with this ID' });
      return;
    }

    const recommendedPhones = await productService.getRecomended(
      phone.id,
      CATEGORY_NAME,
      LIMIT
    );

    res.send(recommendedPhones);
  } catch (error) {
    console.error('Error fetching recommended phones:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getNew = async (req: Request, res: Response) => {
  const limit = 10;

  try {
    const newPhones = await productService.getNew(CATEGORY_NAME, limit);

    res.send(newPhones);
  } catch (error) {
    console.error('Error fetching new phones:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const phonesController = {
  getAll,
  getById,
  getRecommended,
  getNew,
};
