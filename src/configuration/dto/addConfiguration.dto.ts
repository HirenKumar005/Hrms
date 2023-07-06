import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AddConfigurationDto {
  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  resourceId: number;

  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: 'HP',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({
    example: '19535454ewf12121s5a',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  serialNo: string;

  @ApiProperty({
    enum: ['Mahi Enterprise', 'WIPTECH PERIPHERALS PVT LTD'],
    type: 'string',
    required: true,
  })
  @IsEnum({
    Mahi_Enterprise: 'Mahi Enterprise',
    Wiptech_Peripherals_Pvt_Ltd: 'WIPTECH PERIPHERALS PVT LTD',
  })
  @IsString()
  @IsNotEmpty()
  vendor: string;

  @ApiProperty({
    example: '2021-11-08',
    type: 'string',
    format: 'Date',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  purchaseDate: Date;

  @ApiProperty({
    example: 'Pivilion',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsOptional()
  modelName: string;

  @ApiProperty({
    example: 'i3 processor',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsOptional()
  processor: string;

  @ApiProperty({
    example: '5GB',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsOptional()
  RAM: string;

  @ApiProperty({
    example: 'SSD',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsOptional()
  storageType: string;

  @ApiProperty({
    example: 'Window',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsOptional()
  osType: string;

  @ApiProperty({
    example: '10',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsOptional()
  osVersion: string;

  @ApiProperty({
    example: '2GB',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsOptional()
  graphicsCard: string;

  @ApiProperty({
    example: '2021-11-08',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsOptional()
  warrantyStartDate: Date;

  @ApiProperty({
    example: '2023-11-08',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsOptional()
  warrantyEndDate: Date;
}
