import { DataTypes } from 'sequelize';
import * as Moment from 'moment';
import {
  Column,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  AutoIncrement,
  PrimaryKey,
  Default,
  AllowNull,
  HasMany,
} from 'sequelize-typescript';
import { Users } from './users.model';

@Table
export class Position extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column({
    type: DataTypes.ENUM(
      'Intern',
      'Junior Developer',
      'Senior Developer',
      'Team Leader',
    ),
  })
  position: string;

  @Default(Moment().format('YYYY-MM-DD h:mm:ss'))
  @CreatedAt
  @Column
  createdAt: string;

  @Default(Moment().format('YYYY-MM-DD h:mm:ss'))
  @UpdatedAt
  @Column
  updatedAt: string;
    
  @HasMany(() => Users, { foreignKey: 'positionId' })
  user: Users;
}
