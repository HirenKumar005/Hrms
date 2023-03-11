import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AddSupport {
  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  resourceId: number;

  @ApiProperty({
    example: 'laptop is not working',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiProperty({
    example: '2023-01-21',
    type: 'string',
    format: 'date',
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dateOfStatus: Date;

  @ApiProperty({
    example: 'Pending',
    enum: ['Pending', 'On Process', 'Completed'],
    type: 'string',
    required: false,
  })
  @IsEnum({
    Pending: 'Pending',
    On_Process: 'On Process',
    Completed: 'Completed',
    required: false,
  })
  @IsNotEmpty()
  status: string;
}
