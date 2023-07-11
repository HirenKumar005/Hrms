import { DataTypes, Sequelize } from 'sequelize';
import {
  Column,
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Default,
  AllowNull,
} from 'sequelize-typescript';

@Table
export class TaskSheetOfSenior extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(true)
  @Column
  projectName: string;

  @AllowNull(true)
  @Column
  taskName: string;

  @AllowNull(true)
  @Column
  takeDetails: string;

  @AllowNull(true)
  @Column({ type: DataTypes.DATEONLY })
  startDate: Date;

  @AllowNull(true)
  @Column({ type: DataTypes.DATEONLY })
  endDate: Date;

  @AllowNull(true)
  @Column({ type: DataTypes.TIME })
  estimateTime: string;

  @AllowNull(false)
  @Column({ type: DataTypes.TIME })
  remainingTime: string;

  @AllowNull(false)
  @Column
  addedBy: number;

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
