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
import { Course } from './course.model';

@Table
export class Topic extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Course)
  @AllowNull(false)
  @Column
  courseId: number;

  @AllowNull(false)
  @Column
  topicName: string;

  @AllowNull(false)
  @Column
  link: string;

  @AllowNull(false)
  @Column
  hour: number;

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

  @BelongsTo(() => Course)
  course: Course[];
}
