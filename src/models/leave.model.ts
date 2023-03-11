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
export class Leave extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Users)
  @AllowNull(false)
  @Column
  addedBy: number;

  @AllowNull(false)
  @Column
  role: string;

  @ForeignKey(() => Users)
  @AllowNull(false)
  @Column
  assignTo: number;

  @AllowNull(false)
  @Column({ defaultValue: 12 })
  totalLeave: number;

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
