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
  HasMany,
} from 'sequelize-typescript';
import { Configuration } from './configuration.model';
import { DamagedResources } from './damagedResources.model';
import { Users } from './users.model';
import { ResourcesDetails } from './resourcesDetails.model';

@Table
export class Resources extends Model {
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
  resourceName: string;

  @AllowNull(false)
  @Column
  resourceNo: string;

  @AllowNull(false)
  @Column({ type: DataTypes.FLOAT })
  amount: number;

  @AllowNull(false)
  @Column({ type: DataTypes.ENUM('Cash', 'Online', 'Cheque ') })
  paidBy: string;

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

  @HasMany(() => Configuration, { foreignKey: 'resourceId' })
  configuration: Configuration[];

  @HasMany(() => DamagedResources, { foreignKey: 'resourceId' })
  DamagedResources: DamagedResources[];

  @HasMany(() => ResourcesDetails, { foreignKey: 'resourceId' })
  resourcesDetails: ResourcesDetails[];
}
