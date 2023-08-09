import { Favorites } from '../models/favorites.model';
import { Product } from '../models/product.model';

const getAllUserFavorites = async (userId: number) => {
  const favorites = await Favorites.findAll({
    where: { userId },
    include: Product,
  });
  const products = favorites.map((favorite) => favorite.Product);

  return products;
};

const getOneFavorite = (itemId: string, userId: string) => {
  return Favorites.findOne({
    where: {
      itemId,
      userId,
    },
  });
};

const addToFavorites = (userId: number, itemId: number) => {
  return Favorites.create({
    userId,
    itemId,
  });
};

const removeFromFavorites = (userId: number, itemId: number) => {
  return Favorites.destroy({
    where: {
      userId,
      itemId,
    },
  });
};

export const favoritesService = {
  getAllUserFavorites,
  addToFavorites,
  getOneFavorite,
  removeFromFavorites,
};
