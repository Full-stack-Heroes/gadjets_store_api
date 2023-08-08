import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { User } from '../types/user';

const secret = process.env.SERVER_TOKEN_SECRET || 'secretsecret';

export const signJWT = (
  user: User,
  callback: (error: Error | null, token: string | null) => void
): void => {
  console.log('Auth', `Apptempt to sign token for ${user.username}`);

  try {
    jwt.sign(
      {
        username: user.username,
      },
      secret,
      {
        algorithm: 'HS256',
        expiresIn: '1h',
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
