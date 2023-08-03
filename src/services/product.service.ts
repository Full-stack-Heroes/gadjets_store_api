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

const getNew = (category: string, limit: number) => {
  return Product.findAll({
    where: {
      category: category,
    },
    order:[['year', 'DESC']],
    limit
  });
};

const getByDiscount = (discount: number) => {
  return Product.findAll({
    where: Sequelize.literal(
      `CAST("fullPrice" AS numeric) - CAST("price" AS numeric) > ${discount}`
    ),
  });
};

export const productService = {
  getAll,
  getAllByCategory,
  getRecomended,
  getNew,
  getByDiscount,
  getAllByOptionsCount,
};
