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

  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column({ type: 'TIMESTAMP' })
  createdAt: Date;

  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column({ type: 'TIMESTAMP' , defaultValue:  Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')})
  updatedAt: Date;

  @Column({ defaultValue: false })
  isDeleted: boolean;

  @BelongsTo(() => Users)
  users: Users[];
}
