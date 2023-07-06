import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsOptional,
} from 'class-validator';

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
