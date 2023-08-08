import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { User } from '../types/user';

const secret = process.env.SERVER_TOKEN_SECRET || 'secretsecret';
const expireTime = process.env.SERVER_TOKEN_EXPIRETIME || 3600;

export const signJWT = (
  user: User,
  callback: (error: Error | null, token: string | null) => void,
): void => {
  const timeSinchEpoch = new Date().getTime();
  const expirationTime = timeSinchEpoch + Number(expireTime) * 100000;

  const expirationTimeInSeconds = Math.floor(expirationTime / 1000);

  console.log('Auth', `Apptempt to sign token for ${user.username}`);

  try {
    jwt.sign({
      username: user.username,
    }, secret, {
      algorithm: 'HS256',
      expiresIn: expirationTimeInSeconds
    }, (error, encoded) => {
      if (error) {
        callback(error, null);
      } else if (encoded) {
        callback(null, encoded);
      }
    });
  } catch(error) {
    console.log('Auth', error);
  }
};

