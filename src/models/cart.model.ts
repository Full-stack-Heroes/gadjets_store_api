import { Model, Column, Table, AllowNull } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
  tableName: 'Cart',
  createdAt: false,
  updatedAt: false,
})
export class Cart extends Model {
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
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 1,
  })
    quantity: number;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
    userId: number;
  Product: any;
}
