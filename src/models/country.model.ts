import { Sequelize } from 'sequelize';
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
import { Address } from './address.model';

@Table
export class Country extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  countryName: string;

  @Default(Sequelize.literal("CURRENT_TIMESTAMP"))
  @Column({ type: "TIMESTAMP" })
  createdAt: Date;

  @Default(Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))
  @Column({ type: "TIMESTAMP" })
  updatedAt: Date;

  @Column({ defaultValue: 0 })
  isDeleted: boolean;
  
  @HasMany(() => Address, { foreignKey: 'countryId' })
  user: Address;
}
