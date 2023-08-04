import { Sequelize } from 'sequelize-typescript';
import 'dotenv/config';
import { models } from '../models';

const URI = process.env.DB_URI || 'null';

export const dbInit = () => {
  return new Sequelize(URI, {
    models,
    logging: false,
    dialectOptions: {
      ssl: true,
    },
  });
};
