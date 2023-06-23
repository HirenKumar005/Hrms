import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AddDocument {
  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    enum: ['Aadhar Card', 'Pan Card', 'Driving License'],
    type: 'string',
    required: true,
  })
  @IsEnum({
    Aadhar_Card: 'Aadhar Card',
    Pan_Card: 'Pan Card',
    Driving_License: 'Driving License',
  })
  @IsNotEmpty()
  fileName: string;

  @ApiProperty({
    example: 'BLGPS372638',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsOptional()
  cardNo: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  @IsOptional()
  fileUpload: Express.Multer.File;
}
