import { MaxLength } from 'class-validator';
import { Sequelize } from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  Column,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { TaskSheetOfSenior } from './taskSheetOfSenior.model';
import { Users } from './users.model';

@Table
export class TasksheetAssignTo extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  @MaxLength(11)
  id: number;

  @ForeignKey(() => TaskSheetOfSenior)
  @AllowNull(false)
  @MaxLength(11)
  @Column
  tasksheetOfSeniorId: number;

  @ForeignKey(() => Users)
  @AllowNull(false)
  @MaxLength(11)
  @Column
  assignTo: number;

  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column({ type: 'TIMESTAMP' })
  createdAt: Date;

  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column({
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal(
      'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    ),
  })
  updatedAt: Date;
}
