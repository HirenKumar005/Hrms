import * as moment from 'moment';
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
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

  @Default(moment().format('YYYY-MM-DD h:mm:ss'))
  @CreatedAt
  @Column
  createdAt: string;

  @Default(moment().format('YYYY-MM-DD h:mm:ss'))
  @UpdatedAt
  @Column
  updatedAt: string;

  @Column({ defaultValue: 0 })
  isDeleted: boolean;

  @BelongsTo(() => Users)
  user: Users;
}
