import { DataTypes } from 'sequelize';
import * as Moment from 'moment';
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
import { Users } from './users.model';

@Table
export class LeaveUser extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Users)
  @AllowNull
  @Column
  userId: number;

  @ForeignKey(() => Users)
  @AllowNull(true)
  @Column
  approvalBy: number;

  @AllowNull(false)
  @Column({ type: DataTypes.DATEONLY })
  fromDate: string;

  @AllowNull(false)
  @Column({ type: DataTypes.DATEONLY })
  toDate: Date;

  @AllowNull(false)
  @Column
  leaveDays: number;

  @AllowNull(true)
  @Column({ type: DataTypes.DATEONLY })
  approvalDate: string;

  @AllowNull(false)
  @Column
  reason: string;

  @AllowNull
  @Column({ type: DataTypes.ENUM('Pending', 'Approve', 'Reject') })
  status: string;

  @AllowNull(true)
  @Column
  rejectReason: string;

  @AllowNull
  @Column({ type: DataTypes.ENUM('Full', 'Half', 'WFH') })
  leaveType: string;

  @Default(Moment().format('YYYY-MM-DD h:mm:ss'))
  @CreatedAt
  @Column
  createdAt: string;

  @Default(Moment().format('YYYY-MM-DD h:mm:ss'))
  @UpdatedAt
  @Column
  updatedAt: string;

  @Column({ defaultValue: false })
  isDeleted: boolean;

  @BelongsTo(() => Users)
  users: Users[];
}
