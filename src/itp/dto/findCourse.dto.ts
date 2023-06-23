import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class IdValidationDto {
  @ApiProperty({ example: 1, type: 'number', format: 'number' })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  userId?: number;

  @ApiProperty({ example: 1, type: 'number', format: 'number' })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  id?: number;

  @ApiProperty({ example: 1, type: 'number', format: 'number' })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  courseId?: number;
}