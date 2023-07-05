import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export class EditTechnicalDetailsDto {
  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    example: '4',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  english: string;

  @ApiProperty({
    example: '4',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  communication: string;

  @ApiProperty({
    example: '4',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  confidence: string;

  @ApiProperty({
    example: 'xyz afv',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  review: string;

  @ApiProperty({
    example: 'Rejected',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsEnum({
    Pending: 'Pending',
    Selected: 'Selected',
    Rejected: 'Rejected',
  })
  @IsString()
  @IsNotEmpty()
  status: string;
}
