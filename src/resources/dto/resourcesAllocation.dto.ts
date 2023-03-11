import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ResourcesAllocation {
  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  resourceId: number;
  
  @IsString()
  @IsOptional()
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

  @ApiProperty({
    example: 'Employee has no laptop',
    type: 'string',
    format: 'string',
    required: false,
  })
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
