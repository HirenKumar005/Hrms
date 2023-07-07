import { DataTypes, Sequelize } from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Resources } from './resources.model';
import { Users } from './users.model';

@Table
export class DamagedResources extends Model {
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
  addedBy: number;

  @AllowNull(true)
  @Column({ type: DataTypes.TEXT })
  reason: string;

  @Default('Damaged')
  @AllowNull(false)
  @Column
  status: string;

  @Default(Sequelize.literal("CURRENT_TIMESTAMP"))
  @Column({ type: "TIMESTAMP" })
  createdAt: Date;

  @Default(Sequelize.literal("CURRENT_TIMESTAMP"))
  @Column({ type: "TIMESTAMP" , defaultValue:  Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')})
  updatedAt: Date;

  @Column({ defaultValue: 0 })
  isDeleted: boolean;

  @BelongsTo(() => Users)
  users: Users[];

  @BelongsTo(() => Resources)
  resource: Resources[];
}
