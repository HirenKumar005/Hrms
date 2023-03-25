import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Users } from './users.model';

@Table
export class ReportTo extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Users)
  @Column
  assignerId: number;

  @ForeignKey(() => Users)
  @Column
  assigneeId: number;

  @BelongsTo(() => Users, { foreignKey: 'assigneeId' })
  user: Users;
}
