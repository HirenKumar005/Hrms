import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export class addTechnicalRecruitmentDto {
  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  assineeId: number;

  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  technology: number;

  @ApiProperty({ example: 'Online', type: 'string', required: true })
  @IsEnum({
    Online: 'Online',
    Offline: 'Offline',
  })
  @IsNotEmpty()
  type: string;

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
    example: 'https://meet.google.com/',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  link: string;

  @ApiProperty({ example: 'Technical1', type: 'string', required: true })
  @IsEnum({
    Technical1: 'Technical1',
    Technical2: 'Technical2',
  })
  @IsNotEmpty()
  round: string;
}
