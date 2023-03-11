import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsNumber, IsNotEmpty, IsBoolean } from 'class-validator';

export class DeleteCourse {
  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    example: true,
    type: 'boolean',
    format: 'boolean',
  })
  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;
};