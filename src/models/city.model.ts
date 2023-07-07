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
  HasMany,
} from 'sequelize-typescript';
import { Address } from './address.model';
import { State } from './state.model';

@Table
export class City extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => State)
  @AllowNull(false)
  @Column
  stateId: number;

  @AllowNull(false)
  @Column
  cityName: string;

  @Default(Sequelize.literal("CURRENT_TIMESTAMP"))
  @Column({ type: "TIMESTAMP" })
  createdAt: Date;

  @Default(Sequelize.literal("CURRENT_TIMESTAMP"))
  @Column({ type: "TIMESTAMP" , defaultValue:  Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')})
  updatedAt: Date;
  
  @Column({ defaultValue: 0 })
  isDeleted: boolean;

  @BelongsTo(() => State)
  state: State;
  
  @HasMany(() => Address, { foreignKey: 'cityId' })
  user: Address;
}
