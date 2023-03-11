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
  BelongsTo
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

  @AllowNull(false)
  @Column({ type: DataTypes.TIME })
  estimateTime: string;

  @AllowNull(false)
  @Column({ type: DataTypes.TIME })
  takenTime: string;

  @Default('Pending')
  @Column({ type: DataTypes.ENUM('Pending', 'Approve', 'Reject ')})
  status: string;

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
}