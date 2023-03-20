import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateSupportStatus {
  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  resourceId: number;

  @ApiProperty({
    example: 'On Process',
    enum: ['Pending', 'On Process', 'Completed'],
    type: 'string',
    required: true,
  })
  @IsEnum({
    Pending: 'Pending',
    On_Process: 'On Process',
    Completed: 'Completed',
    required: true,
  })
  @IsNotEmpty()
  status: string;
}
