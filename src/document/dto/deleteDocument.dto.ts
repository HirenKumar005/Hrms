import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteDocument {
  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    example: 'Pan Card',
    enum: ['Aadhar Card', 'Pan Card', 'Driving License'],
    type: 'string',
    required: false
  })
  @IsEnum({
    Aadhar_Card: 'Aadhar Card',
    Pan_Card: 'Pan Card',
    Driving_License: 'Driving License',
  })
  @IsNotEmpty()
  fileName: string;
}
