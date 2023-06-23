import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';

export class ListOfSupportsDto {
  @ApiProperty({
    example: ["id", "DESC"],
    type: 'array',
    format: 'array',
    required: false,
  })
  @IsArray()
  @IsOptional()
  order: string[];
}
