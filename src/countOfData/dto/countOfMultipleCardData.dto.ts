import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
export class CountOfMultipleCardData {
  @ApiProperty({
    example: `['Employee', 'HR']`,
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsArray()
  @IsOptional()
  role: string[];
}
