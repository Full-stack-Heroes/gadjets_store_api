import { Request, Response } from 'express';
import { favoritesService } from '../services/favorites.service';

const getAllFavorites = async (req: Request, res: Response) => {
  const { userId } = res.locals.jwt;

  try {
    const favorites = await favoritesService.getAllUserFavorites(userId);

    return res.send(favorites);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

const addFavorites = async (req: Request, res: Response) => {
  const { userId } = res.locals.jwt;
  const { itemId } = req.body;

  if (!itemId) {
    return res.status(400).send({ message: 'Field itemId required' });
  }

  try {
    const isFavExists = await favoritesService.getOneFavorite(itemId, userId);

    if (isFavExists) {
      return res.status(400).send({ message: 'Favorites is already saved' });
    }

    await favoritesService.addToFavorites(userId, itemId);

    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

const deleteFavorite = async (req: Request, res: Response) => {
  const { userId } = res.locals.jwt;
  const { itemId } = req.body;

  if (!itemId) {
    return res.status(400).send({ message: 'Field itemId required' });
  }


  try {
    const isFavExists = await favoritesService.getOneFavorite(itemId, userId);

    if (!isFavExists) {
      return res.status(400).send({ message: 'Cannot find favorite with this id for this user' });
    }

    await favoritesService.removeFromFavorites(userId, itemId);

    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

export const userFavoritesController = {
  getAllFavorites,
  addFavorites,
  deleteFavorite
};
