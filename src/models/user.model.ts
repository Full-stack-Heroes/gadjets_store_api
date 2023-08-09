import { Model, Column, Table, AllowNull } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
  tableName: 'Users',
  createdAt: false,
  updatedAt: false,
})
export class User extends Model {
  @AllowNull(false)
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
    id: number;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
    email: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
    firstName: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
    lastName: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
    password: string;

  @Column({
    type: DataTypes.STRING,
    defaultValue: 'User',
    allowNull: false,
  })
    role: 'User' | 'Admin';
}
