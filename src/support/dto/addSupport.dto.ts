import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
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
  issueId: number;

  @ApiProperty({
    example: 'Laptop',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  resourceName: string;

  @ApiProperty({
    example: 'SI-02-22',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  resourceNo: string;

  @ApiProperty({
    example: 'laptop is not working',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  reason: string;
}
