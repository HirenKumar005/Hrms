import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AddRecruitmentDto {
  @ApiProperty({ example: 2, type: 'number', format: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  qualificationId: number;

  @ApiProperty({
    example: 'ABC',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  candidateName: string;

  @ApiProperty({
    example: '2023-03-07',
    type: 'string',
    format: 'Date',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  dateOfInterview: Date;

  @ApiProperty({
    example: '11:00',
    type: 'string',
    format: 'Time',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  timeOfInterview: Date;

  @ApiProperty({
    example: '4',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  experience: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  @IsOptional()
  resume?: Express.Multer.File;

  @ApiProperty({
    example: '4',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  english: string;

  @ApiProperty({
    example: '4',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  communication: string;

  @ApiProperty({
    example: '4',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  confidence: string;

  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  technology: number;

  @ApiProperty({
    example: 'xyz afv',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  review: string;

  @ApiProperty({
    example: 'Selected',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsEnum({
    Selected: 'Selected',
    Rejected: 'Rejected',
  })
  @IsString()
  @IsNotEmpty()
  status: string;
}
