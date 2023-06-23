import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
  IsOptional,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AddLeaveDto {
  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: 13,
    type: 'number',
    format: 'number',
    required: true,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  approvalBy?: number;

  @ApiProperty({
    example: '2021-11-08',
    type: 'string',
    format: 'Date',
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  fromDate: Date;

  @ApiProperty({
    example: '2021-11-08',
    type: 'string',
    format: 'Date',
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  toDate: Date;

  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  leaveDays: number;

  @ApiProperty({
    example: '2021-11-08',
    type: 'string',
    format: 'Date',
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  approvalDate?: Date;

  @ApiProperty({
    example: 'ABC',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiProperty({ example: 'Pending', type: 'string', required: true })
  @IsEnum({
    Pending: 'Pending',
    Approve: 'Approve',
    Reject: 'Reject',
  })
  @IsNotEmpty()
  status: string;

  @ApiProperty({ example: 'Full', type: 'string', required: true })
  @IsEnum({
    Full: 'Full',
    Half: 'Half',
    WFH: 'WFH',
  })
  @IsNotEmpty()
  leaveType: string;
}
