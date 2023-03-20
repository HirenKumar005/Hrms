import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { NUMBER } from 'sequelize';

export class AddResources {
  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  addedBy: number;

  @ApiProperty({
    example: 'Laptop',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  resourceName: string;

  @ApiProperty({
    example: 'SI-02-22',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  resourceNo: string;

  @ApiProperty({
    example: 1002.7,
    type: 'number',
    format: 'number',
    required: true,
  })
  @IsNumber()
  @Type(() => NUMBER)
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    enum: ['Cash', 'Online', 'Cheque'],
    type: 'string',
    required: true,
  })
  @IsEnum({
    Cash: 'Cash',
    Online: 'Online',
    Cheque: 'Cheque',
  })
  @IsNotEmpty()
  paidBy: string;
}
