import {Column, Table} from 'sequelize-typescript';
import {dbInit} from '../db/dbInit';
import {DataTypes, Model} from 'sequelize';
import {type} from 'os';

const sequelize = dbInit();

@Table({
  tableName: 'products',
  createdAt: false,
  updatedAt: false,
})
class Product extends Model {
  @Column({
    type: DataTypes.STRING,
  })
  name: string;
}
