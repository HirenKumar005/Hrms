import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Users } from './users.model';
import { DataTypes, Sequelize } from 'sequelize';

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

  @Default(Sequelize.literal("CURRENT_TIMESTAMP"))
  @Column({ type: "TIMESTAMP" })
  createdAt: Date;

  @Default(Sequelize.literal("CURRENT_TIMESTAMP"))
  @Column({ type: "TIMESTAMP" , defaultValue:  Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')})
  updatedAt: Date;

  @Column({ defaultValue: 0 })
  isDeleted: boolean;

  @BelongsTo(() => Users)
  user: Users;
}
