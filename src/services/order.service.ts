import { Order } from '../models/orders.model';
import { Product } from '../models/product.model';

const getAll = async (userId: number | number[]) => {
  const orders = await Order.findAll({
    where: {
      userId,
    }
  });

  const preparedOrders = await Promise.all(orders.map(async ({id, createdAt, status, items}) => {
    const ids = items.map(({ itemId }) => itemId);

    const products = await Product.findAll({
      where: {
        id: ids,
      }
    });

    const productsWithQuantity = products.map((product, index) => ({
      ...product.dataValues,
      quantity: items[index].quantity
    }));
    
    return {
      id,
      createdAt,
      status,
      productsWithQuantity,
    };
  }));

  return preparedOrders;
};

const getOne = (userId: number, orderId: number) => {
  return Order.findOne({
    where: {
      userId,
      id: orderId,
    }
  });
};

export const orderService = {
  getAll,
  getOne
};
