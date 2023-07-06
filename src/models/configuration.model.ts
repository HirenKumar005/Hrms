import * as Moment from 'moment';
import { DataTypes } from 'sequelize';
import {
  Column,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
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

  @Default(Moment().format('YYYY-MM-DD h:mm:ss'))
  @CreatedAt
  @Column
  createdAt: string;

  @Default(Moment().format('YYYY-MM-DD h:mm:ss'))
  @UpdatedAt
  @Column
  updatedAt: string;

  @Column({ defaultValue: 0 })
  isDeleted: boolean;

  @BelongsTo(() => Users)
  users: Users[];

  @BelongsTo(() => Resources)
  resources: Resources;
};