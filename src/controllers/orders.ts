import { Request, Response } from 'express';
import { orderService } from '../services/order.service';
import { cartService } from '../services/cart.service';
import { Order } from '../models/orders.model';

const getAllUserOrders = async (req: Request, res: Response) => {
  const { userId } = res.locals.jwt;
  
  try {
    const orders = await orderService.getAll(userId);
    
    res.send(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).send('Internal Server Error');
  }
};

const createOrder = async (req: Request, res: Response) => {
  const { userId } = res.locals.jwt;
  
  const userCart = await cartService.getAllUserCart(userId);

  if (userCart.length === 0) {
    return res.status(404).send({message: 'There are no items in user cart'});
  }

  const items = userCart.map(({ id, quantity }) => ({
    itemId: id,
    quantity,
  }));

  console.log(items);

  try {
    const order = await Order.create({
      items: items,
      userId,
    });

    const itemsIds = items.map(({ itemId }) => itemId);

    await cartService.removeItem(userId, itemsIds);

    return res.status(201).send(order);
  } catch (error) {
    console.log('Error while create order', error);
    return res.status(500).send({ message: 'Internal server error while creating order' });
  }
};

const changeStatus = async (req: Request, res: Response) => {
  const { userId } = res.locals.jwt;
  const { orderId, status } = req.body;

  try {
    const orderToChange = await orderService.getOne(userId, orderId);

    if (!orderToChange) {
      return res.status(404).send({ message: 'There no order with this id' });
    }

    await orderToChange.update(status);
    return res.status(200).send({ message: 'Succsesful change' });

  } catch (error) {
    console.log('Error while editing order', error);
    return res.status(500).send({ message: 'Internal server error while editing order' });
  }
};

export const orderController = {
  getAllUserOrders,
  createOrder,
  changeStatus,
};
