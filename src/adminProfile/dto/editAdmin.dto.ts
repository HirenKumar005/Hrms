import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class EditAdminDto {
  @ApiProperty({
    example: 'Nilesh',
    type: 'string',
    format: 'string',
    required: false
  })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({
    example: 'Solanki',
    type: 'string',
    format: 'string',
    required: false
  })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({
    example: 'nileshsolanki@gmail.com',
    type: 'string',
    format: 'string',
    required: false
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    example: '1234567890',
    type: 'string',
    format: 'string',
    required: false
  })
  @IsString()
  @IsMobilePhone()
  @IsOptional()
  phoneNo: string;

  @ApiProperty({
    example: 'Male',
    enum: ['Male', 'Female', 'Other'],
    type: 'string',
    required: false
  })
  @IsEnum({
    Male: 'Male',
    Female: 'Female',
    Other: 'Other',
    required: false
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

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  profileImage: Express.Multer.File;

  @ApiProperty({
    example: 'nileshsolanki@gmail.com',
    type: 'string',
    format: 'string',
    required: false
  })
  @IsEmail()
  @IsOptional()
  personalEmail: string;

  @ApiProperty({
    example: 'Gota',
    type: 'string',
    format: 'string',
    required: false
  })
  @IsString()
  @IsOptional()
  addressLine1: string;

  @ApiProperty({
    example: 'Sola',
    type: 'string',
    format: 'string',
    required: false
  })
  @IsString()
  @IsOptional()
  addressLine2: string;

  @ApiProperty({ example: 1, type: 'number', format: 'number', required: false })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  cityId: number;

  @ApiProperty({ example: 1, type: 'number', format: 'number', required: false })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  stateId: number;

  @ApiProperty({ example: 1, type: 'number', format: 'number', required: false })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  countryId: number;

  @ApiProperty({
    example: 'nileshsolanki@gmail.com',
    type: 'string',
    format: 'string',
    required: false
  })
  @IsEmail()
  @IsOptional()
  skypeId: string;
}
