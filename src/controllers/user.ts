import { NextFunction, Request, Response } from 'express';
import bcryptjs from 'bcryptjs';

const validateToken = (req: Request, res: Response, rext: NextFunction) => {
  console.log('User', 'Token validated');

  res.status(200).send({ message: 'User Authorized' });
};

const register = (req: Request, res: Response, rext: NextFunction) => {
  const { username, password } = req.body;

  bcryptjs.hash(password, 7, (hashError, hash) => {
    if (hashError) {
      res.status(500).send({
        message: hashError.message,
        error: hashError,
      });

      // Insert User here
    }
  });
};

const login = (req: Request, res: Response, rext: NextFunction) => {

};

const getAllUsers = (req: Request, res: Response, rext: NextFunction) => {

};

export const userController = {
  validateToken, register, login, getAllUsers
};