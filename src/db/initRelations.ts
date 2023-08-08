import { Accessories } from '../models/accessories.model';
import { Cart } from '../models/cart.model';
import { Favorites } from '../models/favorites.model';
import { Phones } from '../models/phones.model';
import { Product } from '../models/product.model';
import { Tablets } from '../models/tablets.model';

export const initRelations = () => {
  Phones.belongsTo(Product, {
    foreignKey: 'id',
    targetKey: 'itemId',
    as: 'productItemInfo',
  });

  Tablets.belongsTo(Product, {
    foreignKey: 'id',
    targetKey: 'itemId',
    as: 'productItemInfo',
  });

  Accessories.belongsTo(Product, {
    foreignKey: 'id',
    targetKey: 'itemId',
    as: 'productItemInfo',
  });

  Cart.belongsTo(Product, {
    foreignKey: 'itemId'
  });

  Favorites.belongsTo(Product, {
    foreignKey: 'itemId'
  });
};
