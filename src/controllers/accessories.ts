import { Request, Response } from 'express';
import { Accessories } from '../models/accessories.model';
import { Product } from '../models/product.model';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';

const getAll = async (req: Request, res: Response) => {
  try {
    const accessories = await Product.findAll({
      where: {
        category: 'accessories',
      },
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

const getRecommended = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const accessory = await Accessories.findByPk(id);

    if (!accessory) {
      res.status(404).send({ message: 'Cannot find Accessory with this ID' });
      return;
    }

    const recommendedAccessories = await Accessories.findAll({
      where: {
        id: { [Op.not]: accessory.id },
      },
      order: [Sequelize.fn('RANDOM')],
      limit: 5,
    });

    res.send(recommendedAccessories);
  } catch (error) {
    console.error('Error fetching recommended accessories:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const accessoriesController = {
  getAll,
  getById,
  getRecommended,
};
