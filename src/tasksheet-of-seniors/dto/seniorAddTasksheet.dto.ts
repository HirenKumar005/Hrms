import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class SeniorAddTasksheetDto {
  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  addedBy: number;

  @ApiProperty({
    example: 'Job-Portal',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  projectName: string;

  @ApiProperty({
    example: 'Task-1',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  taskName: string;

  @ApiProperty({
    example: 'Task Details',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  takeDetails: string;

  @ApiProperty({
    example: '2021-11-08',
    type: 'string',
    format: 'Date',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({
    example: '2021-11-11',
    type: 'string',
    format: 'Date',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({
    example: '4:00',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  estimateTime: string;

  @ApiProperty({
    example: '2:00',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  remainingTime: string;

  @ApiProperty({
    example: [1],
    required: true,
  })
  @IsArray()
  @IsNotEmpty()
  assignTo: number[];
}
