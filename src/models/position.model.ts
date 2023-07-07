import { DataTypes, Sequelize } from 'sequelize';
import {
  Column,
  Model,
  Table,
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

  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column({ type: 'TIMESTAMP' })
  createdAt: Date;

  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column({ type: 'TIMESTAMP' , defaultValue:  Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')})
  updatedAt: Date;
    
  @HasMany(() => Users, { foreignKey: 'positionId' })
  user: Users;
}
