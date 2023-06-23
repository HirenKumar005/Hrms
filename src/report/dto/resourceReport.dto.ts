import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ResourceDto {
  @ApiProperty({
    example: '2023-02-19',
    type: 'string',
    format: 'Date',
  })
  @IsString()
  @IsOptional()
  startDate?: Date;

  @ApiProperty({
    example: '2023-02-24',
    type: 'string',
    format: 'Date',
  })
  @IsString()
  @IsOptional()
  endDate?: Date;

  @ApiProperty({
    example: 'Ravi',
    type: 'string',
    format: 'string',
  })
  @IsString()
  @IsOptional()
  resourceName?: string;
};