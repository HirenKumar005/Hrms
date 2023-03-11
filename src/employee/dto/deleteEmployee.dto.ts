import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class DeleteEmployeeDto {
  @ApiProperty({
    example: true,
    type: 'boolean',
    format: 'boolean',
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  isDeleted: boolean;
}
