import { ApiProperty } from '@nestjs/swagger';
import {
    IsNumber,
    IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ListOfConfigurationDto {
  @ApiProperty({ example: 1, type: 'number', format: 'number', required: false })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  id: number;
}
