import { FindOptions, Op, Sequelize } from 'sequelize';
import { Product } from '../models/product.model';

const getAll = () => {
  return Product.findAll();
};

const getAllByOptionsCount = (options: FindOptions) => {
  return Product.findAndCountAll(options);
};

const getAllByCategory = (category: string) => {
  return Product.findAll({
    where: {
      category,
    },
  });
};

const getRecomended = (id: string, category: string, limit: number) => {
  return Product.findAll({
    where: {
      itemId: { [Op.not]: id },
      category,
    },
    order: [Sequelize.fn('RANDOM')],
    limit,
  });
};

const getNew = (limit: number) => {
  return Product.findAll({
    order: [['year', 'DESC']],
    limit,
  });
};

const getWithMaxDiscount = (limit: number) => {
  return Product.findAll({
    order: [
      [
        Sequelize.literal(
          'CAST("fullPrice" AS numeric) - CAST("price" AS numeric)'
        ),
        'DESC',
      ],
    ],
    limit,
  });
};

const getSearch = async (searchQuery: string) => {
  return await Product.findAll({
    order: [ [Sequelize.literal(`
    CASE
      WHEN "capacity" ~ '\\d+ TB' THEN CAST(SUBSTRING("capacity" FROM '\\d+') AS INTEGER) * 1024 * 1024 * 1024 * 1024
      WHEN "capacity" ~ '\\d+ GB' THEN CAST(SUBSTRING("capacity" FROM '\\d+') AS INTEGER) * 1024 * 1024 * 1024
      WHEN "capacity" ~ '\\d+ MB' THEN CAST(SUBSTRING("capacity" FROM '\\d+') AS INTEGER) * 1024 * 1024
      ELSE 0
    END
  `), 'DESC']],
    where: {
      name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + searchQuery.toLowerCase() + '%'),
      category: {
        [Op.not]: 'accessories'
      }
    },
    limit: 5
  });
};

export const productService = {
  getAll,
  getAllByCategory,
  getRecomended,
  getNew,
  getWithMaxDiscount,
  getAllByOptionsCount,
  getSearch,
};
