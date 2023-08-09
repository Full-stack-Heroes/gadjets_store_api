import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';

const getAllUserCart = async (userId: number) => {
  const favorites = await Cart.findAll({
    where: { userId },
    include: Product,
  });
  const products = favorites.map(favorite => ({
    ...favorite.Product.dataValues,
    quantity: favorite.quantity
  }));

  return products;
};

const getOneItem = (itemId: string, userId: string) => {
  return Cart.findOne({
    where: {
      itemId,
      userId,
    },
  });
};

const addToCart = (userId: number, itemId: number, quantity?: number) => {
  return Cart.create({
    userId,
    itemId,
    quantity,
  });
};

const updateCart = (cartItem: Cart, quantity?: number) => {
  return cartItem.update({ quantity });
};

const removeItem = (userId: number, itemId: number) => {
  return Cart.destroy({
    where: {
      itemId,
      userId,
    },
  });
};

export const cartService = {
  getAllUserCart,
  getOneItem,
  addToCart,
  removeItem,
  updateCart,
};
