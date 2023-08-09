import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { User } from '../models/user.model';
import { signJWT } from '../functions/signJWT';
import { userService } from '../services/user.service';

const validateToken = (req: Request, res: Response) => {
  console.log('User', 'Token validated');

  res.status(200).send({
    message: 'User Authorized',
    id: res.locals.jwt.userId,
  });
};

const register = (req: Request, res: Response) => {
  const { email, firstName, lastName, password, role } = req.body;

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
        return res.status(404).send({ message: 'User already Exists' });
      }

      await User.create({
        email,
        firstName,
        lastName,
        password: hash,
        role,
      });

      return res.send({ message: 'User created' });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const currentUser = await userService.findByEmail(email);

    if (!currentUser) {
      return res.status(401).send({
        message: 'User with this username isn\'t registered',
      });
    }

    bcryptjs.compare(password, currentUser.password, (err, success) => {
      if (err) {
        console.log(err);

        return res.status(500).send({ message: 'Internal Server Error' });
      }

      if (success) {
        signJWT(currentUser, (_error, token) => {
          if (_error) {
            console.log('Unable to sign token', _error);

            return res.status(401).send({ message: 'Unauthorized' });
          } else if (token) {
            return res.status(200).send({
              message: 'Auth Successful',
              token,
              user: currentUser,
            });
          }
        });
      }

      if (!success) {
        return res.status(403).send({
          message: 'Passwords isn\'t mach',
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

// const getAllUsers = async (req: Request, res: Response) => {
//   const reqEmail = res.locals.jwt.email;

//   try {
//     const requestUser = await userService.findByEmail(reqEmail);

//     if (requestUser && requestUser.role === 'Admin') {
//       const allUsers = await User.findAndCountAll({
//         attributes: ['username'],
//       });

//       return res.send(allUsers);
//     } else {
//       return res.status(403).send({ message: 'You dont have premission' });
//     }
//   } catch (error) {
//     console.log(error);

//     res.status(500).send({ message: 'Internal server error' });
//   }
// };

export const userController = {
  validateToken,
  register,
  login,
};
