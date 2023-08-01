import { Model, Column, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
  tableName: 'Tablets',
  createdAt: false,
  updatedAt: false,
})
export class Tablets extends Model {
  @Column({
    type: DataTypes.STRING,
    primaryKey: true,
  })
    id: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
    namespaceId: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
    name: string;

  @Column({
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  })
    capacityAvailable: string[];

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
    capacity: string;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
    priceRegular: number;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
    priceDiscount: number;

  @Column({
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  })
    colorsAvailable: string[];

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
    color: string;

  @Column({
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  })
    images: string[];

  @Column({
    type: DataTypes.JSONB,
    allowNull: false,
  })
    description!: {
    title: string;
    text: string[];
  }[];

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
    screen: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
    resolution: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
    processor: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
    ram: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
    camera: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
    zoom: string;

  @Column({
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  })
    cell: string[];
}
