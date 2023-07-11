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
import { TaskSheetOfSenior } from './taskSheetOfSenior.model';

@Table
export class TaskSheet extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(true)
  @Column
  projectTask: string;

  @ForeignKey(() => TaskSheetOfSenior)
  @AllowNull(false)
  @Column
  taskSheetOfSeniorId: number;

  @AllowNull(true)
  @Column({ type: DataTypes.DATEONLY })
  date: Date;

  @AllowNull(true)
  @Column({ type: DataTypes.TIME })
  takenTime: string;

  @Default('Pending')
  @Column({ type: DataTypes.ENUM('Pending', 'Approve', 'Reject ') })
  status: string;

  @AllowNull(false)
  @Column
  detailsOfTask: string;

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

  @Column({ defaultValue: 0 })
  isDeleted: boolean;

  @BelongsTo(() => TaskSheetOfSenior)
  taskSheetOfSenior: TaskSheetOfSenior;
}
