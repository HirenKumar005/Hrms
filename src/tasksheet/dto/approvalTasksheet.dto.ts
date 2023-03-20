import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsEnum } from 'class-validator';

export class ApprovalTimesheetDto {
  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  addedBy: number;

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

  @ApiProperty({
    example: 'Approve',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  reason: string;
}
