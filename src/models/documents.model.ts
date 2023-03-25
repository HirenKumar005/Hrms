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
import { DataTypes } from 'sequelize';
import * as moment from 'moment';

@Table
export class Documents extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Users)
  @Column
  userId: number;

  @AllowNull(false)
  @Column({
    type: DataTypes.ENUM('Aadhar Card', 'Pan Card', 'Driving License', 'Education'),
  })
  fileName: string;

  @AllowNull(true)
  @Column
  cardNo: string;

  @AllowNull(false)
  @Column
  fileUpload: string;

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
