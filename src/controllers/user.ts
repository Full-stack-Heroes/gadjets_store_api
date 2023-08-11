import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { User } from '../models/user.model';
import { signJWT } from '../functions/signJWT';
import { userService } from '../services/user.service';
import { cartService } from '../services/cart.service';
import { favoritesService } from '../services/favorites.service';
import { orderService } from '../services/order.service';

const validateToken = (req: Request, res: Response) => {
  console.log('User', 'Token validated');

  res.status(200).send({
    message: 'User Authorized',
    id: res.locals.jwt.userId,
  });
};

const register = (req: Request, res: Response) => {
  const { email, username, password, role } = req.body;

  bcryptjs.hash(password, 7, async (hashError, hash) => {
    if (hashError) {
      return res.status(500).send({
        message: hashError.message,
        error: hashError,
      });
    }

    try {
      const isUserExists = await userService.findByEmail(email);

      if (isUserExists) {
        return res.status(400).send({ message: 'User already Exists' });
      }

      await User.create({
        email,
        username,
        password: hash,
        role,
      });

      return res.status(201).send({ message: 'User created' });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email.length || !password.length) {
    return res.status(400).send({
      message: 'Fields can`t be empty. Please enter the data!',
    });
  }

  try {
    const currentUser = await userService.findByEmail(email);

    if (!currentUser) {
      return res.status(401).send({
        message: 'User with this email isn\'t registered',
      });
    }

    bcryptjs.compare(password, currentUser.password, (err, success) => {
      if (err) {
        console.log(err);

        return res.status(500).send({ message: 'Internal Server Error' });
      }

      if (success) {
        signJWT(currentUser, async (_error, token) => {
          if (_error) {
            console.log('Unable to sign token', _error);

            return res.status(401).send({ message: 'Unauthorized' });
          } else if (token) {
            const { id } = currentUser;
            const cartData = await cartService.getAllUserCart(id);
            const favoritesData = await favoritesService.getAllUserFavorites(
              id
            );
            const ordersData = await orderService.getAll(id);

            return res.status(200).send({
              message: 'Auth Successful',
              token,
              userId: id,
              cartData,
              favoritesData,
              ordersData,
            });
          }
        });
      }

      if (!success) {
        return res.status(403).send({
          message: 'Wrong password',
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

export const userController = {
  validateToken,
  register,
  login,
};
