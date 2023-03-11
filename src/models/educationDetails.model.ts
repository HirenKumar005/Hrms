import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Users } from './users.model';
import * as moment from 'moment';
import { Qualification } from './qualification.model';

@Table
export class EducationDetails extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Users)
  @AllowNull(false)
  @Column
  userId: number;

  @ForeignKey(() => Qualification)
  @AllowNull(false)
  @Column
  qualificationId: number;
  
  @AllowNull(false)
  @Column
  fileName: string;

  @AllowNull(false)
  @Column
  collegeName: string;

  @AllowNull(false)
  @Column
  passingYear: number;

  @Column
  fileUpload: string;

  @Default(moment().format('YYYY-MM-DD h:mm:ss'))
  @CreatedAt
  @Column
  createdAt: string;

  @Default(moment().format('YYYY-MM-DD h:mm:ss'))
  @UpdatedAt
  @Column
  updatedAt: string;

  @Column({ defaultValue: 0 })
  isDeleted: boolean;

  @BelongsTo(() => Users)
  user: Users;

  @BelongsTo(() => Qualification)
  qualification: Qualification;
}
