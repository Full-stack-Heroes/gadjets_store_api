import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';

const getAllUserCart = async (userId: number) => {
  const cart = await Cart.findAll({
    where: { userId },
    include: Product,
  });
  const products = cart.map((cart) => ({
    ...cart.Product.dataValues,
    quantity: cart.quantity,
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

const removeItem = (userId: number, itemId: number | number[]) => {
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
