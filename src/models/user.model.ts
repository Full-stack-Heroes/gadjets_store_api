import { Model, Column, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
  tableName: 'Users',
  createdAt: false,
  updatedAt: false,
})
export class User extends Model {
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
    username: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
    password: string;
}
