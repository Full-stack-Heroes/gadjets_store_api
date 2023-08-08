import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secret = process.env.SERVER_TOKEN_SECRET || 'secretsecret';

console.log(secret);

export const extractJWT = (req: Request, res: Response, next: NextFunction) => {
  console.log('Auth', 'Validating token');

  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(
      token,
      secret,
      (error, decoded) => {
        if (error) {
          return res.status(404).send({
            message: error.message,
            error,
          });
        } else {
          res.locals.jwt = decoded;
          next();
        }
      });
  } else {
    return res.status(401).send({ message: 'Unauthorized'});
  }
};