import { Request, Response } from 'express';
import { Tablets } from '../models/tablets.model';
import { Product } from '../models/product.model';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';

const getAll = async (req: Request, res: Response) => {
  try {
    const accessories = await Product.findAll({
      where: {
        category: 'tablets',
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

const getRecommended = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const tablet = await Tablets.findByPk(id);

    if (!tablet) {
      res.status(404).send({ message: 'Cannot find Tablet with this ID' });
      return;
    }

    const recommendedTablets = await Tablets.findAll({
      where: {
        id: { [Op.not]: tablet.id },
      },
      order: [Sequelize.fn('RANDOM')],
      limit: 5,
    });

    res.send(recommendedTablets);
  } catch (error) {
    console.error('Error fetching recommended tablets:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const tabletsController = {
  getAll,
  getById,
  getRecommended
};
