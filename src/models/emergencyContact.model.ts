import { Sequelize } from 'sequelize';
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
import { Users } from './users.model';

@Table
export class EmergencyContact extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Users)
  @AllowNull(false)
  @Column
  userId: number;

  @AllowNull(false)
  @Column
  primaryName: string;

  @AllowNull(false)
  @Column
  primaryContactNo: string;

  @AllowNull(false)
  @Column
  primaryRelation: string;

  @AllowNull(false)
  @Column
  secondaryName: string;

  @AllowNull(false)
  @Column
  secondaryContactNo: string;

  @AllowNull(false)
  @Column
  secondaryRelation: string;

  @Default(Sequelize.literal("CURRENT_TIMESTAMP"))
  @Column({ type: "TIMESTAMP" })
  createdAt: Date;

  @Default(Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))
  @Column({ type: "TIMESTAMP" })
  updatedAt: Date;

  @Column({ defaultValue: 0 })
  isDeleted: boolean;

  @BelongsTo(() => Users)
  user: Users;
}
