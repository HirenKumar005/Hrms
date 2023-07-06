import { Sequelize } from 'sequelize';
import {
  Column,
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  ForeignKey,
  HasMany,
  Default,
} from 'sequelize-typescript';
import { AssignUserCourse } from './assignUserCourse.model';
import { Users } from './users.model';
@Table
export class UserCourse extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Users)
  @AllowNull(false)
  @Column
  userId: number;

  @Default(Sequelize.literal("CURRENT_TIMESTAMP"))
  @Column({ type: "TIMESTAMP" })
  createdAt: Date;

  @Default(Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))
  @Column({ type: "TIMESTAMP" })
  updatedAt: Date;

  @Column({ defaultValue: false })
  isDeleted: boolean;

  @HasMany(() => AssignUserCourse)
  assignUserCourse: AssignUserCourse[]
  
}