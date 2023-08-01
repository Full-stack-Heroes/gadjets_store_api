// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
dotenv.config();

const credentials = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: 5432,
  dialect: 'postgres',
  seederStorage: 'sequelize',
};

const development = {
  ...credentials,
  dialectOptions: {
    ssl: true,
  }
};

const production = {
  ...credentials,
  dialectOptions: {
    ssl: true,
  }
};

module.exports = {
  development,
  production,
};
