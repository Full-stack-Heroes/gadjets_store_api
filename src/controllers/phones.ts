import { Request, Response } from 'express';
import { Phones } from '../models/phones.model';
import { Product } from '../models/product.model';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';

const getAll = async (req: Request, res: Response) => {
  try {
    const accessories = await Product.findAll({
      where: {
        category: 'phones',
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
    const phones = await Phones.findByPk(id);

    if (!phones) {
      res.status(404).send({ message: 'Cannot find Phone with this ID' });

      return;
    }

    res.send(phones);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getRecommended = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const phone = await Phones.findByPk(id);

    if (!phone) {
      res.status(404).send({ message: 'Cannot find Phone with this ID' });
      return;
    }

    const recommendedPhones = await Phones.findAll({
      where: {
        id: { [Op.not]: phone.id },
      },
      order: [Sequelize.fn('RANDOM')],
      limit: 5,
    });

    res.send(recommendedPhones);
  } catch (error) {
    console.error('Error fetching recommended phones:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const phonesController = {
  getAll,
  getById,
  getRecommended,
};
