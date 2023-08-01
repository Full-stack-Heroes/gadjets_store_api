import { Request, Response } from 'express';
import { Accessories } from '../models/accessories.model';
import { Product } from '../models/product.model';

const getAll = async (req: Request, res: Response) => {

  try {
    const accessories = await Product.findAll({
      where: {
        category: 'accessories'
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
    const accessories = await Accessories.findByPk(id);

    if (!accessories) {
      res.status(404).send({ message: 'Cannot find Accessory with this ID' });

      return;
    }


    res.send(accessories);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const accessoriesController = {
  getAll,
  getById,
};
