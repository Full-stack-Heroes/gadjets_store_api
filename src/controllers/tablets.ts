import { Request, Response } from 'express';
import { Tablets } from '../models/tablets.model';
import { Product } from '../models/product.model';

const getAll = async (req: Request, res: Response) => {

  try {
    const accessories = await Product.findAll({
      where: {
        category: 'tablets'
      }
    });

    res.send(accessories);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const tablets = await Tablets.findByPk(id);

    if (!tablets) {
      res.status(404).send({ message: 'Cannot find Tablet with this ID' });

      return;
    }


    res.send(tablets);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const tabletsController = {
  getAll,
  getById,
};
