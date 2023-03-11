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
import { Resources } from './resources.model';
import { Users } from './users.model';
import { DataTypes } from 'sequelize';
import * as moment from 'moment';

@Table
export class Support extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Users)
  @AllowNull(false)
  @Column
  userId: number;

  @ForeignKey(() => Resources)
  @AllowNull(false)
  @Column
  resourceId: number;

  @AllowNull(false)
  @Column({ type: DataTypes.TEXT })
  reason: string;

  @Default(moment().format('YYYY-MM-DD'))
  @Column
  dateOfRequest: string;

  @Column({ type: DataTypes.DATEONLY })
  dateOfStatus: Date;

  @AllowNull(false)
  @Column({
    type: DataTypes.ENUM('Pending', 'On Process', 'Completed'),
  })
  status: string;

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

  @BelongsTo(() => Resources)
  resource: Resources;
}
