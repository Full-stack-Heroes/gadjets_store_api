import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { User } from '../types/user';

const secret = process.env.SERVER_TOKEN_SECRET || 'secretsecret';

export const signJWT = (
  user: User,
  callback: (error: Error | null, token: string | null) => void
): void => {
  try {
    jwt.sign(
      {
        userId: user.id,
      },
      secret,
      {
        algorithm: 'HS256',
        expiresIn: '12h',
      },
      (error, encoded) => {
        if (error) {
          callback(error, null);
        } else if (encoded) {
          callback(null, encoded);
        }
      }
    );
  } catch (error) {
    console.log('Auth', error);
  }
};
