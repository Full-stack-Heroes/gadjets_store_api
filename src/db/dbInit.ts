import { Sequelize } from 'sequelize-typescript';
import 'dotenv/config';
import { models } from '../models';

const URI = process.env.DB_URI || 'null';

export const sequelize = new Sequelize(URI, {
  models,
  dialectOptions: {
    ssl: true,
  },
});
