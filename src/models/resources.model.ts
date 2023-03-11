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
  HasMany,
} from 'sequelize-typescript';
import { Configuration } from './configuration.model';
import { DamagedResources } from './damagedResources.model';
import { Users } from './users.model';

@Table
export class Resources extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Users)
  @AllowNull(false)
  @Column
  addedBy: number;

  @AllowNull(false)
  @Column
  resourceName: string;

  @AllowNull(false)
  @Column
  resourceNo: string;

  @AllowNull(false)
  @Column({ type: DataTypes.FLOAT })
  amount: number;

  @AllowNull(false)
  @Column({ type: DataTypes.ENUM('Cash', 'Online', 'Cheque ') })
  paidBy: string;

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

  @HasMany(() => Configuration, { foreignKey: 'resourceId' })
  configuration: Configuration[];

  @HasMany(() => DamagedResources, { foreignKey: 'resourceId' })
  DamagedResources: DamagedResources[];
}
