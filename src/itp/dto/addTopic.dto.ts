import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TopicsValidation {
  @ApiProperty({
    example: 'Promises',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  topicName: string;

  @ApiProperty({
    example: 'https://nodejs.org/en/',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  link: string;

  @ApiProperty({ example: 1, required: true })
  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  hour: number;
}

export class TopicDto {
  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: 'Node js',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  courseName: string;

  @ApiProperty({ type: [TopicsValidation], required: false })
  @ValidateNested({ each: true })
  @Type(() => TopicsValidation)
  @IsArray()
  topic: TopicsValidation[];
}
