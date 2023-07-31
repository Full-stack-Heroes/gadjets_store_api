import { Product } from '../models/product.model';
import { sequelize } from '../db/dbInit';

sequelize.authenticate();
const t = sequelize.transaction();

import data from './temp_data.json';

Product.sync({ alter: true })
  .then(() => console.log('done'))
  .catch(() => 'Something went wrong');

const transactionInit = async () => {
  try {
    await Promise.all(
      data.map((item) => {
        const clone = (({ id, ...o }) => o)(item);
        Product.create(clone);
      })
    );

    (await t).commit();
  } catch (err) {
    console.log('failed');

    (await t).rollback();
  }
};

transactionInit();
