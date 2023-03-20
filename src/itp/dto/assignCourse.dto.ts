import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber
} from 'class-validator';

export class AssignCourse {
  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  courseId: number;

  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}