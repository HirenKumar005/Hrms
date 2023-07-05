import * as Moment from 'moment';
import {
  Column,
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { BeforeInsert, BeforeUpdate, CreateDateColumn } from 'typeorm';
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

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  insertCreated() {
    this.created_at = new Date(
      Moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss')
    );
    this.updated_at = new Date(
      Moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss')
    );
  }

  @BeforeUpdate()
  insertUpdated() {
    this.updated_at = new Date(
      Moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss')
    );
  }

  @Column({ defaultValue: false })
  isDeleted: boolean;

  @BelongsTo(() => Course)
  course: Course;
}
