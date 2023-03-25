import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber
} from 'class-validator';

export class AssignCourse {
  @ApiProperty({
    example: [1],
    required: true,
  })
  @IsArray()
  @IsNotEmpty()
  courseId: number[];

  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}