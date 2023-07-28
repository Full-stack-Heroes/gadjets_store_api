import { Column, Table } from "sequelize-typescript";
import { dbInit } from "../db/dbInit";
import { Model } from "sequelize";

const sequelize = dbInit();

@Table({
  tableName: 'products',
  createdAt: false,
  updatedAt: false,
})

class Product extends Model {
  @Column
  name: string
};
