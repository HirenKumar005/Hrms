import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class AddTasksheet {
  @ApiProperty({ example: 8, type: 'number', format: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  addedBy: number;

  @ApiProperty({
    example: '2021-11-08',
    type: 'string',
    format: 'Date',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    example: 'abc',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  nameOfTask: string;

  @ApiProperty({
    example: 'xyz',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  detailsOfTask: string;

  @ApiProperty({
    example: '4:00',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  takenTime: string;

  @ApiProperty({
    example: 'Pending',
    enum: ['Pending', 'Approve', 'Reject'],
    type: 'string',
    required: true,
  })
  @IsEnum({
    Pending: 'Pending',
    Approve: 'Approve',
    Reject: 'Reject',
    required: true,
  })
  @IsNotEmpty()
  status: string;
}
