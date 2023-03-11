import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AddEducation {
  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  qualificationId: number;

  @ApiProperty({
    example: 'Education',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  fileName: string;
  
  @ApiProperty({
    example: 'SAL college',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  collegeName: string;

  @ApiProperty({
    example: 2021,
    type: 'number',
    format: 'number',
    required: true,
  })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  passingYear: number;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  @IsOptional()
  fileUpload: Express.Multer.File;
}
