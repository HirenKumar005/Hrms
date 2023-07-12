import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export class EditTaskSheetDto {
  @ApiProperty({
    example: 'HRMS',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  projectTask: string;

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
  @IsOptional()
  status: string;

  @ApiProperty({
    example: 'xyz',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  detailsOfTask: string;
}
