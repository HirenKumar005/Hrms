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
import { Users } from './users.model';

@Table
export class TaskSheet extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Users)
  @AllowNull(false)
  @Column
  addedBy: number;

  @ForeignKey(() => Users)
  @AllowNull(false)
  @Column
  reportTo: number;

  @AllowNull(false)
  @Column({ type: DataTypes.DATEONLY })
  date: Date;

  @AllowNull(false)
  @Column
  nameOfTask: string;

  @AllowNull(false)
  @Column
  detailsOfTask: string;

  @Column({ type: DataTypes.TIME })
  estimateTime: string;

  @AllowNull(false)
  @Column({ type: DataTypes.TIME })
  takenTime: string;

  @Default('Pending')
  @Column({ type: DataTypes.ENUM('Pending', 'Approve', 'Reject ') })
  status: string;

  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column({ type: 'TIMESTAMP' })
  createdAt: Date;

  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column({ type: 'TIMESTAMP' , defaultValue:  Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')})
  updatedAt: Date;

  @Column({ defaultValue: 0 })
  isDeleted: boolean;

  @BelongsTo(() => Users)
  users: Users[];
}
