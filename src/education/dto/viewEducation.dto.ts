import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ViewEducation {
  @ApiProperty({
    example: 1,
    type: 'number',
    format: 'number',
    required: false,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  id: number;

  @ApiProperty({
    example: false,
    type: 'boolean',
    format: 'boolean',
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  isDeleted: boolean;
}
