import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
} from 'class-validator';

export class FindAllocateDevice {
  @ApiProperty({
    example: 'laptop',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  resourceName: string;
};