import { DataTypes } from 'sequelize';
import * as moment from 'moment';
import {
  Column,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  AutoIncrement,
  PrimaryKey,
  Unique,
  Default,
  ForeignKey,
  BelongsTo,
  AllowNull,
} from 'sequelize-typescript';
import { City } from './city.model';
import { State } from './state.model';
import { Country } from './country.model';

@Table
export class Admin extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  firstName: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @Unique
  @AllowNull(false)
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @AllowNull(false)
  @Column
  phoneNo: string;

  @AllowNull(false)
  @Column({ type: DataTypes.DATEONLY })
  dob: Date;

  @AllowNull(false)
  @Column({ type: DataTypes.ENUM('Male', 'Female', 'Other') })
  gender: string;

  @AllowNull(false)
  @Column
  profileImage: string;

  @AllowNull(false)
  @Column
  skypeId: string;

  @AllowNull(false)
  @Column
  personalEmail: string;

  @AllowNull(false)
  @Column
  addressLine1: string;

  @AllowNull(false)
  @Column
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

  @Default(moment().format('YYYY-MM-DD h:mm:ss'))
  @CreatedAt
  @Column
  createdAt: string;

  @Default(moment().format('YYYY-MM-DD h:mm:ss'))
  @UpdatedAt
  @Column
  updatedAt: string;

  @Column({ defaultValue: 0 })
  isDeleted: boolean;

  @BelongsTo(() => City)
  city: City;

  @BelongsTo(() => State)
  state: State;

  @BelongsTo(() => Country)
  country: Country;
}
