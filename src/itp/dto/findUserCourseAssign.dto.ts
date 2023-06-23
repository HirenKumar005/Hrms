import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class FindAssignCourse {
  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsOptional()
  courseId: number;

  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsOptional()
  userId: number;
};