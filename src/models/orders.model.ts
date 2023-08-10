import { Model, Column, Table, AllowNull } from 'sequelize-typescript';
import { DataTypes, Sequelize } from 'sequelize';

@Table({
  tableName: 'Orders',
  updatedAt: false,
})
export class Order extends Model {
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
    defaultValue: 'In Progress',
  })
    status: 'In Progress' | 'Done' | 'Cancelled';

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('NOW'),
  })
    createdAt: string;

  @Column({
    type: DataTypes.ARRAY(DataTypes.JSONB),
    allowNull: false,
  })
    items: {
      itemId: number,
      quantity: number,
    }[];

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
    userId: number;
}
