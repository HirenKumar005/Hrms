import { Sequelize } from 'sequelize';
import {
  Column,
  Model,
  Table,
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

  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column({ type: 'TIMESTAMP' })
  createdAt: Date;

  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column({ type: 'TIMESTAMP' , defaultValue:  Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')})
  updatedAt: Date;
  
  @Column({ defaultValue: false })
  isDeleted: boolean;

  @BelongsTo(() => Course)
  course: Course[];
}
