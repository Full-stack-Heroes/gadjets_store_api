import { Request, Response, NextFunction } from 'express';

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
  console.log('Auth', 'Validating token');
};