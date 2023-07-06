import { DataTypes, Sequelize } from 'sequelize';
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
import { Resources } from './resources.model';
import { Users } from './users.model';

@Table
export class ResourcesDetails extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Resources)
  @AllowNull(false)
  @Column
  resourceId: number;

  @ForeignKey(() => Users)
  @AllowNull(false)
  @Column
  assignTo: number;

  @ForeignKey(() => Users)
  @AllowNull(false)
  @Column
  addedBy: number;

  @AllowNull(true)
  @Column({ type: DataTypes.TEXT })
  reason: string;

  @Default('Allocation')
  @AllowNull(false)
  @Column({
    type: DataTypes.ENUM('Release', 'Allocation', 'Reallocation'),
  })
  status: string;

  @Default(Sequelize.literal("CURRENT_TIMESTAMP"))
  @Column({ type: "TIMESTAMP" })
  createdAt: Date;

  @Default(Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))
  @Column({ type: "TIMESTAMP" })
  updatedAt: Date;

  @Column({ defaultValue: 0 })
  isDeleted: boolean;

  @BelongsTo(() => Users)
  users: Users[];

  @BelongsTo(() => Resources)
  resource: Resources[];
}
