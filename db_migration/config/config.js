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
};

const development = {
  username: 'casaos',
  password: 'casaos',
  database: 'casaos',
  host: '192.168.0.110',
  port: 5432,
  dialect: 'postgres',
  
};
const test = {
  ...credentials,
};
const production = {
  ...credentials,
  dialectOptions: {
    ssl: true,
  }
};

module.exports = {
  development,
  test,
  production,
};
