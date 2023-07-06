import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsString,
  IsOptional,
  ValidateNested,
  IsArray,
} from 'class-validator';

export class TopicsValidation {
  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({
    example: 'Promises',
    required: true,
  })
  @IsString()
  @IsOptional()
  topicName?: string;

  @ApiProperty({
    example: 'https://nodejs.org/en/',
    required: true,
  })
  @IsString()
  @IsOptional()
  link?: string;

  @ApiProperty({ example: 1, required: true })
  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsOptional()
  hour?: number;
}

export class UpdateTopicDto {
  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @IsNumber()
  @IsOptional()
  courseId: number;

  @ApiProperty({
    example: 'Node js',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsOptional()
  courseName: string;

  @ApiProperty({ type: [TopicsValidation], required: false })
  @ValidateNested({ each: true })
  @Type(() => TopicsValidation)
  @IsArray()
  topic: TopicsValidation[];
};