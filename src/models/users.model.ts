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
  HasMany,
} from 'sequelize-typescript';
import { Designation } from './designation.model';
import { Position } from './position.model';
import { TaskSheet } from './taskSheet.model';
import { Address } from './address.model';
import { EmergencyContact } from './emergencyContact.model';
import { BankDetails } from './bankDetails.model';
import { EducationDetails } from './educationDetails.model';
import { ReportTo } from './reportTo.model';

@Table
export class Users extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Designation)
  @Column
  designationId: number;

  @ForeignKey(() => Position)
  @Column
  positionId: number;

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

  @Column({ type: DataTypes.DATEONLY })
  dob: Date;

  @Column({ defaultValue: 0 })
  maritalStatus: boolean;

  @AllowNull(false)
  @Column({ type: DataTypes.ENUM('HR', 'Employee') })
  role: string;

  @Column({ type: DataTypes.ENUM('Male', 'Female', 'Other') })
  gender: string;

  @Column({ type: DataTypes.ENUM('Hindu', 'Muslim', 'Christian', 'Jain') })
  religion: string;

  @Column({
    type: DataTypes.ENUM('Indian', 'Canadian', 'Pakistani', 'Australian'),
  })
  nationality: string;

  @AllowNull(false)
  @Column({ type: DataTypes.DATEONLY })
  dateOfJoin: Date;

  @Column
  profileImage: string;

  @Column
  skypeId: string;

  @Column
  personalEmail: string;

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

  @BelongsTo(() => Designation)
  designation: Designation;

  @BelongsTo(() => Position)
  position: Position;

  @HasMany(() => TaskSheet)
  taskSheet: TaskSheet;

  @HasMany(() => Address, { foreignKey: 'userId' })
  address: Address;

  @HasMany(() => EmergencyContact, { foreignKey: 'userId' })
  emergencyContact: EmergencyContact;

  @HasMany(() => BankDetails, { foreignKey: 'userId' })
  bankDetails: BankDetails;

  @HasMany(() => EducationDetails, { foreignKey: 'userId' })
  educationDetails: EducationDetails;

  @HasMany(() => ReportTo, { foreignKey: 'assigneeId' })
  reportTo: ReportTo;
}
