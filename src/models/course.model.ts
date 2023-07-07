import {
  Column,
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Default,
  AllowNull,
  ForeignKey,
  HasMany
} from 'sequelize-typescript';
import { Users } from './users.model';
import { Topic } from './topic.model';
import { AssignUserCourse } from './assignUserCourse.model';
import { Sequelize } from 'sequelize';

@Table
export class Course extends Model {
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
  courseName: string;

  @Column({ defaultValue: 0 })
  duration: number;

  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column({ type: 'TIMESTAMP' })
  createdAt: Date;

  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column({ type: 'TIMESTAMP' , defaultValue:  Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')})
  updatedAt: Date;

  @Column({ defaultValue: false })
  isDeleted: boolean;

  @HasMany(() => Topic)
  topic: Topic[];

  @HasMany(() => AssignUserCourse)
  assignUserCourse: AssignUserCourse[];
}
