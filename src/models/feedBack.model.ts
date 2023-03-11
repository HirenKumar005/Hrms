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
import { Recruitment } from './recruitment.model';

@Table
export class FeedBack extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Users)
  @AllowNull(false)
  @Column
  userId: number;

  @ForeignKey(() => Recruitment)
  @AllowNull(false)
  @Column
  recruitmentId: number;

  @AllowNull(false)
  @Column({ type: DataTypes.TEXT})
  review: string;

  @AllowNull(false)
  @Column({ type: DataTypes.ENUM('HR', 'Technical1', 'Technical2', 'finalReview')})
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
  
  @BelongsTo(() => Recruitment)
  recruitment: Recruitment[];
};