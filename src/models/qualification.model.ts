import {
  AllowNull,
  AutoIncrement,
  Column,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { EducationDetails } from './educationDetails.model';
import { Recruitment } from './recruitment.model';
import { Sequelize } from 'sequelize';

@Table
export class Qualification extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  qualification: string;

  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column({ type: 'TIMESTAMP' })
  createdAt: Date;

  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column({ type: 'TIMESTAMP' , defaultValue:  Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')})
  updatedAt: Date;

  @HasMany(() => EducationDetails, { foreignKey: 'qualificationId' })
  educationDetails: EducationDetails;

  @HasMany(() => Recruitment, { foreignKey: 'qualificationId' })
  recruitment: Recruitment;
}
