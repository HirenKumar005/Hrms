import { Sequelize } from 'sequelize';
import {
  Column,
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  ForeignKey,
  BelongsTo,
  Default
} from 'sequelize-typescript';
import { Course } from './course.model';
import { UserCourse } from './userCourse.model';

@Table
export class AssignUserCourse extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => UserCourse)
  @AllowNull(false)
  @Column
  userCourseId: number;

  @ForeignKey(() => Course)
  @AllowNull(false)
  @Column
  courseId: number;

  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column({ type: 'TIMESTAMP' })
  createdAt: Date;

  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column({ type: 'TIMESTAMP' , defaultValue:  Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')})
  updatedAt: Date;

  @Column({ defaultValue: false })
  isDeleted: boolean;

  @BelongsTo(() => Course)
  course: Course;
};
