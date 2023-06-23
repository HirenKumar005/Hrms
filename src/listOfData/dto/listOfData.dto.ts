import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class ListOfDataDto {
  @ApiProperty({
    example: 'designationModel',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  modelName: string;

  @ApiProperty({
    example: {id: 1},
    type: 'object',
    format: 'object',
    required: false,
  })
  @IsObject()
  @IsOptional()
  condition: object;

  @ApiProperty({
    example: ['id', 'designation'],
    type: 'string',
    isArray: true,
    required: false,
  })
  @IsOptional()
  selectionCriteria: string[];
}
