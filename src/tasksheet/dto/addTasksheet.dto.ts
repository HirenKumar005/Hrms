import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AddTaskSheet {
  @ApiProperty({
    example: 'HRMS',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsOptional()
  projectTask: string;

  @ApiProperty({
    example: 1,
    type: 'number',
    format: 'number',
    required: true,
  })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  taskSheetOfSeniorId: number;

  @ApiProperty({
    example: '2021-11-08',
    type: 'string',
    format: 'Date',
    required: false,
  })
  @IsString()
  @IsOptional()
  date: Date;

  @ApiProperty({
    example: '10:40:40',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  takenTime: string;

  @ApiProperty({
    example: 'Pending',
    enum: ['Pending', 'Approve', 'Reject'],
    type: 'string',
    required: false,
  })
  @IsEnum({
    Pending: 'Pending',
    Approve: 'Approve',
    Reject: 'Reject',
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    example: 'xyz',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  detailsOfTask: string;
}
