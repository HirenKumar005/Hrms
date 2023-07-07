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
} from 'sequelize-typescript';
import { Users } from './users.model';
import { Recruitment } from './recruitment.model';
import { Designation } from './designation.model';

@Table
export class FeedBack extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Recruitment)
  @AllowNull(false)
  @Column
  recruitmentId: number;

  @ForeignKey(() => Users)
  @AllowNull(false)
  @Column
  assineeId: number;

  @ForeignKey(() => Designation)
  @AllowNull(false)
  @Column
  technology: number;

  @AllowNull(false)
  @Column({ type: DataTypes.ENUM('Online', 'Offline') })
  type: string;

  @AllowNull(false)
  @Column({ type: DataTypes.DATEONLY })
  dateOfInterview: Date;

  @AllowNull(false)
  @Column({ type: DataTypes.TIME })
  timeOfInterview: Date;

  @Column
  link: string;

  @Column
  english: number;

  @Column
  communication: number;

  @Column
  confidence: number;

  @Column
  review: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.ENUM('Pending', 'Selected', 'Rejected'),
    defaultValue: 'Pending',
  })
  status: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.ENUM('HR', 'Technical1', 'Technical2'),
    defaultValue: 'HR',
  })
  round: string;

  @Default(Sequelize.literal("CURRENT_TIMESTAMP"))
  @Column({ type: "TIMESTAMP" })
  createdAt: Date;

  @Default(Sequelize.literal("CURRENT_TIMESTAMP"))
  @Column({ type: "TIMESTAMP" , defaultValue:  Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')})
  updatedAt: Date;

  @Column({ defaultValue: 0 })
  isDeleted: boolean;

  @BelongsTo(() => Designation)
  designation: Designation;

  @BelongsTo(() => Users)
  users: Users[];

  @BelongsTo(() => Recruitment)
  recruitment: Recruitment[];
}
