import { Model, Column, Table, AllowNull } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
  tableName: 'FavoriteItems',
  createdAt: false,
  updatedAt: false,
})
export class Favorites extends Model {
  @AllowNull(false)
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
    id: number;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
    itemId: number;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
    userId: number;
  Product: any;

}
