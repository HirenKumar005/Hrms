import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import * as moment from 'moment';
import { EducationDetails } from './educationDetails.model';
import { Recruitment } from './recruitment.model';

@Table
export class Qualification extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  qualification: string;

  @Default(moment().format('YYYY-MM-DD h:mm:ss'))
  @CreatedAt
  @Column
  createdAt: string;

  @Default(moment().format('YYYY-MM-DD h:mm:ss'))
  @UpdatedAt
  @Column
  updatedAt: string;

  @HasMany(() => EducationDetails, { foreignKey: 'qualificationId' })
  educationDetails: EducationDetails;

  @HasMany(() => Recruitment, { foreignKey: 'qualificationId' })
  recruitment: Recruitment;
}
