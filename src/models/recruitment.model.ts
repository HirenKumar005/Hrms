import { DataTypes, Sequelize } from 'sequelize';
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
  HasMany,
} from 'sequelize-typescript';
import { Users } from './users.model';
import { Qualification } from './qualification.model';
import { Designation } from './designation.model';
import { FeedBack } from './feedBack.model';

@Table
export class Recruitment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Users)
  @AllowNull(false)
  @Column
  userId: number;

  @ForeignKey(() => Qualification)
  @Column
  qualificationId: number;

  @AllowNull(false)
  @Column
  candidateName: string;

  @AllowNull(false)
  @Column({ type: DataTypes.DATEONLY })
  dateOfInterview: Date;

  @AllowNull(false)
  @Column({ type: DataTypes.TIME })
  timeOfInterview: Date;

  @AllowNull(false)
  @Column
  experience: string;

  @AllowNull(false)
  @Column
  resume: string;

  @AllowNull(false)
  @Column
  english: number;

  @AllowNull(false)
  @Column
  communication: number;

  @AllowNull(false)
  @Column
  confidence: number;

  @ForeignKey(() => Designation)
  @Column
  technology: number;

  @AllowNull(false)
  @Column
  review: string;

  @AllowNull(false)
  @Column({ type: DataTypes.ENUM('Selected', 'Rejected') })
  status: string;

  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column({ type: 'TIMESTAMP' })
  createdAt: Date;

  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column({ type: 'TIMESTAMP' , defaultValue:  Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')})
  updatedAt: Date;

  @Column({ defaultValue: 0 })
  isDeleted: boolean;

  @BelongsTo(() => Designation)
  designation: Designation;

  @BelongsTo(() => Qualification)
  qualification: Qualification;

  @HasMany(() => FeedBack)
  feedBack: FeedBack[];

  @BelongsTo(() => Users)
  users: Users[];
}
