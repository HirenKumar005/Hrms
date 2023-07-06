import { DataTypes, Sequelize } from 'sequelize';
import {
  Column,
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Default,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Resources } from './resources.model';
import { Users } from './users.model';

@Table
export class Configuration extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Resources)
  @AllowNull(false)
  @Column
  resourceId: number;

  @ForeignKey(() => Users)
  @AllowNull(false)
  @Column
  userId: number;

  @AllowNull(false)
  @Column
  brand: string;

  @Column
  modelName: string;

  @AllowNull(false)
  @Column
  serialNo: string;

  @Column
  processor: string;

  @Column
  RAM: string;

  @Column
  storageType: string;

  @Column
  osType: string;

  @Column
  osVersion: string;

  @Column
  graphicsCard: string;

  @Column({ type: DataTypes.DATEONLY })
  warrantyStartDate: Date;

  @Column({ type: DataTypes.DATEONLY })
  warrantyEndDate: Date;

  @AllowNull(false)
  @Column({
    type: DataTypes.ENUM('Mahi Enterprise', 'WIPTECH PERIPHERALS PVT LTD'),
  })
  vendor: string;

  @AllowNull(false)
  @Column({ type: DataTypes.DATEONLY })
  purchaseDate: Date;

  @Default(Sequelize.literal("CURRENT_TIMESTAMP"))
  @Column({ type: "TIMESTAMP" })
  createdAt: Date;

  @Default(Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))
  @Column({ type: "TIMESTAMP" })
  updatedAt: Date;

  @Column({ defaultValue: 0 })
  isDeleted: boolean;

  @BelongsTo(() => Users)
  users: Users[];

  @BelongsTo(() => Resources)
  resources: Resources;
};