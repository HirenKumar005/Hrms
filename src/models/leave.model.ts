import { Sequelize } from 'sequelize';
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

@Table
export class Leave extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Users)
  @AllowNull(false)
  @Column
  addedBy: number;

  @AllowNull(false)
  @Column
  role: string;

  @ForeignKey(() => Users)
  @AllowNull(false)
  @Column
  assignTo: number;

  @AllowNull(false)
  @Column({ defaultValue: 12 })
  totalLeave: number;

  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column({ type: 'TIMESTAMP' })
  createdAt: Date;

  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column({ type: 'TIMESTAMP' , defaultValue:  Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')})
  updatedAt: Date;

  @Column({ defaultValue: false })
  isDeleted: boolean;

  @BelongsTo(() => Users)
  users: Users[];
  
}
