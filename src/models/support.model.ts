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
import { Resources } from './resources.model';
import { Users } from './users.model';
import { DataTypes, Sequelize } from 'sequelize';
import * as moment from 'moment';
import { SupportIssues } from './supportIssue.model';

@Table
export class Support extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Users)
  @AllowNull(false)
  @Column
  userId: number;

  @ForeignKey(() => SupportIssues)
  @AllowNull(false)
  @Column
  issueId: number;

  @Default(null)
  @ForeignKey(() => Resources)
  @AllowNull(true)
  @Column
  resourceId: number;

  @AllowNull(false)
  @Column({ type: DataTypes.TEXT })
  reason: string;

  @Default(moment().format('YYYY-MM-DD'))
  @Column
  dateOfRequest: string;

  @AllowNull(true)
  @Column({ type: DataTypes.DATEONLY })
  dateOfStatus: Date;

  @AllowNull(false)
  @Default('Pending')
  @Column({
    type: DataTypes.ENUM('Pending', 'On Process', 'Completed'),
  })
  status: string;

  @Default(Sequelize.literal("CURRENT_TIMESTAMP"))
  @Column({ type: "TIMESTAMP" })
  createdAt: Date;

  @Default(Sequelize.literal("CURRENT_TIMESTAMP"))
  @Column({ type: "TIMESTAMP" , defaultValue:  Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')})
  updatedAt: Date;

  @Column({ defaultValue: 0 })
  isDeleted: boolean;

  @BelongsTo(() => SupportIssues)
  supportIssues: SupportIssues;

  @BelongsTo(() => Users)
  user: Users;

  @BelongsTo(() => Resources)
  resource: Resources;
}
