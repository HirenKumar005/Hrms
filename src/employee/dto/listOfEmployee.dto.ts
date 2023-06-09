import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional
} from 'class-validator';
import { Type } from 'class-transformer';export class ListOfEmployeeDto {
  @ApiProperty({ example: 1, type: 'number', format: 'number', required: false })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  id: number;

  @ApiProperty({ example: false, type: 'boolean', format: 'boolean', required: true })
  @IsBoolean()
  @IsNotEmpty()
  isDeleted: boolean;

  @ApiProperty({
    example: ["Employee", "HR"],
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsArray()
  @IsOptional()
  role: string[];
}