import { ApiProperty } from '@nestjs/swagger';
import {
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class EditConfigurationDto {
  @ApiProperty({ example: 1, type: 'number', format: 'number', required: false })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  resourceId: number;
  
  @ApiProperty({ example: 1, type: 'number', format: 'number', required: false })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  userId: number;

  @ApiProperty({
    example: 'HP',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  brand: string;

  @ApiProperty({
    example: '19535454ewf12121s5a',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  serialNo: string;

  @ApiProperty({
    example: 'Ravi',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  vendor: string;

  @ApiProperty({
    example: '2021-11-08',
    type: 'string',
    format: 'Date',
    required: false,
  })
  @IsString()
  @IsOptional()
  purchaseDate: Date;

  @ApiProperty({
    example: 'Pivilion',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  modelName: string;
  
  @ApiProperty({
    example: 'i3 processor',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  processor: string;
  
  @ApiProperty({
    example: '5GB',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  RAM: string;
  
  @ApiProperty({
    example: 'SSD',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  storageType: string;
  
  @ApiProperty({
    example: 'Window',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  osType: string;
  
  @ApiProperty({
    example: '10',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  osVersion: string;
  
  @ApiProperty({
    example: '2GB',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  graphicsCard: string;
  
  @ApiProperty({
    example: '2021-11-08',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  warrantyStartDate: Date;
  
  @ApiProperty({
    example: '2023-11-08',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  warrantyEndDate: Date;
}
