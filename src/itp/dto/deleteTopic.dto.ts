import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsString,
  IsOptional,
  IsBoolean,
  IsNotEmpty,
  ValidateNested,
  IsArray,
} from 'class-validator';

export class TopicsValidations {
  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @IsNumber()
  @IsNotEmpty()
  id?: number;

  @ApiProperty({
    example: true,
    type: 'boolean',
    format: 'boolean',
  })
  @IsBoolean()
  @IsNotEmpty()
  isDeleted?: boolean;
}

export class DeleteTopic {
  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @IsNumber()
  @IsNotEmpty()
  courseId: number;

  @ApiProperty({ type: [TopicsValidations] })
  @ValidateNested({ each: true })
  @Type(() => TopicsValidations)
  @IsArray()
  topic: TopicsValidations[];
};