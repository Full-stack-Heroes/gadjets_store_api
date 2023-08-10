import { User } from '../models/user.model';

const findByEmail = (email: string) => {
  return User.findOne({ where: { email } });
};

export const userService = {
  findByEmail,
};
