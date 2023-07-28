import { Sequelize } from "sequelize-typescript";
import 'dotenv/config';

const URI = process.env.DB_URI || 'null';

export const dbInit = () => {
  return new Sequelize(URI, {
    dialectOptions: {
      ssl: true,
    }
  })
}
