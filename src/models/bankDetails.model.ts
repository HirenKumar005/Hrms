import { Sequelize } from 'sequelize';
import {
  Column,
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Unique,
  Default,
  ForeignKey,
  BelongsTo,
  AllowNull,
} from 'sequelize-typescript';
import { Users } from './users.model';

@Table
export class BankDetails extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Unique
  @ForeignKey(() => Users)
  @AllowNull(false)
  @Column
  userId: number;

  @AllowNull(false)
  @Column
  bankName: string;

  @AllowNull(false)
  @Column
  bankAccountNo: number;

  @AllowNull(false)
  @Column
  accountHolderName: string;

  @AllowNull(false)
  @Column
  ifscCode: string;

  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column({ type: 'TIMESTAMP' })
  createdAt: Date;

  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column({ type: 'TIMESTAMP' , defaultValue:  Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')})
  updatedAt: Date;

  @Column({ defaultValue: 0 })
  isDeleted: boolean;

  @BelongsTo(() => Users)
  user: Users;
}
