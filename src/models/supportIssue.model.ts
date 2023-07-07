import { Sequelize } from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  Column,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class SupportIssues extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  issue: string;

  @Default(Sequelize.literal("CURRENT_TIMESTAMP"))
  @Column({ type: "TIMESTAMP" })
  createdAt: Date;

  @Default(Sequelize.literal("CURRENT_TIMESTAMP"))
  @Column({ type: "TIMESTAMP" , defaultValue:  Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')})
  updatedAt: Date;

  @Column({ defaultValue: false })
  isDeleted: boolean;
}