import { DataTypes, Sequelize } from "sequelize";
import {
  Column,
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
  AllowNull,
} from "sequelize-typescript";
import { City } from "./city.model";
import { State } from "./state.model";
import { Country } from "./country.model";
import { Users } from "./users.model";

@Table
export class Address extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Users)
  @AllowNull(false)
  @Column
  userId: number;

  @AllowNull(false)
  @Column({ type: DataTypes.TEXT })
  addressLine1: string;

  @AllowNull(false)
  @Column({ type: DataTypes.TEXT })
  addressLine2: string;

  @ForeignKey(() => City)
  @AllowNull(false)
  @Column
  cityId: number;

  @ForeignKey(() => State)
  @AllowNull(false)
  @Column
  stateId: number;

  @ForeignKey(() => Country)
  @AllowNull(false)
  @Column
  countryId: number;

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

  @BelongsTo(() => City)
  city: City;

  @BelongsTo(() => State)
  state: State;

  @BelongsTo(() => Country)
  country: Country;
}
