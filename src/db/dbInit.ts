import { Sequelize } from 'sequelize-typescript';
import 'dotenv/config';
import { models } from '../models';

const URI = process.env.DB_URI || 'null';
const database = process.env.DB_NAME || 'null';
const dbUserName =  process.env.DB_USERNAME || 'null';
const dbPassword =  process.env.DB_PASSWORD || 'null';

export const dbInit = () => {
  return new Sequelize(database, dbUserName, dbPassword, {
    host: 'postgres_db',
    dialect: 'postgres',
    models,
    dialectOptions: {
      // ssl: true,
    },
  });
};
