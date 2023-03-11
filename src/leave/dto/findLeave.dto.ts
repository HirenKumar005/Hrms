import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class IdValidationDto {
  @ApiProperty({ example: 1, type: 'number', format: 'number' })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  assignTo?: number;

  @ApiProperty({ example: 1, type: 'number', format: 'number' })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  addedBy?: number;

  @ApiProperty({ example: 1, type: 'number', format: 'number' })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  id?: number;
}
