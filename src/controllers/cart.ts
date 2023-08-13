import { Request, Response } from 'express';
import { cartService } from '../services/cart.service';

const getAll = async (req: Request, res: Response) => {
  const { userId } = res.locals.jwt;

  try {
    const favorites = await cartService.getAllUserCart(userId);

    return res.send(favorites);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

const addToCart = async (req: Request, res: Response) => {
  const { userId } = res.locals.jwt;
  const { itemId, quantity } = req.body;

  if (!itemId) {
    return res.status(400).send({ message: 'Field itemId required' });
  }

  try {
    const isExistsCart = await cartService.getOneItem(itemId, userId);

    if (isExistsCart) {
      await cartService.updateCart(isExistsCart, quantity);
      return res.status(204).send({ message: 'Updated Cart' });
    }

    await cartService.addToCart(userId, itemId, quantity);

    return res.status(201).send({ message: 'Created' });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

const remove = async (req: Request, res: Response) => {
  const { userId } = res.locals.jwt;
  const { itemId } = req.body;

  if (!itemId) {
    return res.status(400).send({ message: 'Field itemId required' });
  }

  try {
    const isCartItemExists = await cartService.getOneItem(itemId, userId);

    if (!isCartItemExists) {
      return res
        .status(400)
        .send({ message: 'Cannot find cart item with this id for this user' });
    }

    await cartService.removeItem(userId, itemId);

    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

export const cartController = {
  getAll,
  addToCart,
  remove,
};
