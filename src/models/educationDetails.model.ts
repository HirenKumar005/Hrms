import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Users } from './users.model';
import { Qualification } from './qualification.model';
import { Sequelize } from 'sequelize';

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
  collegeName: string;

  @AllowNull(false)
  @Column
  passingYear: number;

  @Default(Sequelize.literal("CURRENT_TIMESTAMP"))
  @Column({ type: "TIMESTAMP" })
  createdAt: Date;

  @Default(Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))
  @Column({ type: "TIMESTAMP" })
  updatedAt: Date;

  @Column({ defaultValue: 0 })
  isDeleted: boolean;

  @BelongsTo(() => Users)
  user: Users;

  @BelongsTo(() => Qualification)
  qualification: Qualification;
}
