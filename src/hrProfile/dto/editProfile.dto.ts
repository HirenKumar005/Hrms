import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class UserDto {
  @ApiProperty({
    example: 'Kaushik',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({
    example: 'Rathod',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({
    example: 'kaushikrathod@gmail.com',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    example: '1234567890',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsMobilePhone()
  @IsOptional()
  phoneNo: string;

  @ApiProperty({
    example: 'Male',
    enum: ['Male', 'Female', 'Other'],
    type: 'string',
    required: false,
  })
  @IsEnum({
    Male: 'Male',
    Female: 'Female',
    Other: 'Other',
  })
  @IsOptional()
  gender: string;

  @ApiProperty({
    example: '1995-07-22',
    type: 'string',
    format: 'Date',
    required: false
  })
  @IsString()
  @IsOptional()
  dob: Date;

  @ApiProperty({
    example: 'Hindu',
    enum: ['Hindu', 'Muslim', 'Christian', 'Jain'],
    type: 'string',
    required: false,
  })
  @IsEnum({
    Hindu: 'Hindu',
    Muslim: 'Muslim',
    Christian: 'Christian',
    Jain: 'Jain',
  })
  @IsOptional()
  religion: string;

  @ApiProperty({
    example: 'Indian',
    enum: ['Indian', 'Canadian', 'Pakistani', 'Australian'],
    type: 'string',
    required: false,
  })
  @IsEnum({
    Indian: 'Indian',
    Canadian: 'Canadian',
    Pakistani: 'Pakistani',
    Australian: 'Australian',
  })
  @IsOptional()
  nationality: string;

  @ApiProperty({
    example: 'kaushikrathod@gmail.com',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  personalEmail: string;

  @ApiProperty({
    example: 'kaushikrathod@gmail.com',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  skypeId: string;
}

class AddressDto {
  @ApiProperty({
    example: 'Bodakdev',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  addressLine1: string;

  @ApiProperty({
    example: 'Chiloda',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  addressLine2: string;

  @ApiProperty({
    example: 1,
    type: 'number',
    format: 'number',
    required: false,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  cityId: number;

  @ApiProperty({
    example: 1,
    type: 'number',
    format: 'number',
    required: false,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  stateId: number;

  @ApiProperty({
    example: 1,
    type: 'number',
    format: 'number',
    required: false,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  countryId: number;
}

class EmergencyContactDto {
  @ApiProperty({
    example: 'Ashokbhai',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  primaryName: string;

  @ApiProperty({
    example: '1234567890',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsMobilePhone()
  @IsOptional()
  primaryContactNo: string;

  @ApiProperty({
    example: 'Father',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  primaryRelation: string;

  @ApiProperty({
    example: 'Parulben',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  secondaryName: string;

  @ApiProperty({
    example: '1234567890',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsMobilePhone()
  @IsOptional()
  secondaryContactNo: string;

  @ApiProperty({
    example: 'Mother',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  secondaryRelation: string;
}

export class EditProfileDto {
  @ApiProperty({ type: UserDto, required: false })
  @ValidateNested({ each: true })
  @Type(() => UserDto)
  @IsObject()
  user: UserDto;

  @ApiProperty({ type: AddressDto, required: false })
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  @IsObject()
  address: AddressDto;

  @ApiProperty({ type: EmergencyContactDto, required: false })
  @ValidateNested({ each: true })
  @Type(() => EmergencyContactDto)
  @IsObject()
  emergencyContact: EmergencyContactDto;
}
