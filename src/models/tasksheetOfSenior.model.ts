import { MaxLength } from 'class-validator';
import { DataTypes, Sequelize } from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  Column,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Users } from './users.model';

@Table
export class TasksheetOfSenior extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  @MaxLength(11)
  id: number;

  @ForeignKey(() => Users)
  @AllowNull(false)
  @MaxLength(11)
  @Column
  addedBy: number;

  @AllowNull(false)
  @MaxLength(50)
  @Column
  projectName: string;

  @AllowNull(false)
  @MaxLength(50)
  @Column
  taskName: string;

  @AllowNull(false)
  @MaxLength(50)
  @Column
  takeDetails: string;

  @AllowNull(false)
  @Column({ type: DataTypes.DATEONLY })
  startDate: Date;

  @AllowNull(false)
  @Column({ type: DataTypes.DATEONLY })
  endDate: Date;

  @AllowNull(false)
  @Column({ type: DataTypes.TIME })
  estimateTime: string;

  @AllowNull(true)
  @Column({ type: DataTypes.TIME })
  remainingTime: string;

  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column({ type: 'TIMESTAMP' })
  createdAt: Date;

  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column({
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal(
      'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    ),
  })
  updatedAt: Date;
}
