import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class RecruitmentDto {
  @ApiProperty({
    example: '2023-02-19',
    type: 'string',
    format: 'Date',
  })
  @IsString()
  @IsOptional()
  startDate?: Date;

  @ApiProperty({
    example: '2023-02-24',
    type: 'string',
    format: 'Date',
  })
  @IsString()
  @IsOptional()
  endDate?: Date;

  @ApiProperty({
    example: 'NodeJs',
    type: 'string',
    format: 'string',
  })
  @IsString()
  @IsOptional()
  technologyName?: string;

  @ApiProperty({
    example: 'Selected',
    type: 'string',
    format: 'string',
  })
  @IsString()
  @IsOptional()
  status?: string;
};