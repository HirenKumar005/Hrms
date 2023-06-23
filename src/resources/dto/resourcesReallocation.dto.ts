import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ResourcesReallocation { 
  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @Type(() => Number)
  @IsOptional()
  resourceId: number;

  @ApiProperty({ example: 'S1-02-21', type: 'string', format: 'string', required: true })
  @IsString()
  @IsNotEmpty()
  resourceNo: string;

  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  assignTo: number;

  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  addedBy: number;

  @IsString()
  @IsOptional()
  reason: string;

  @ApiProperty({
    example: 'Allocation',
    enum: ['Release', 'Allocation', 'Reallocation'],
    type: 'string',
    required: false,
  })
  @IsEnum({
    release: 'Release',
    allocation: 'Allocation',
    reallocation: 'Reallocation',
    required: false,
  })
  @IsOptional()
  status: string;
}