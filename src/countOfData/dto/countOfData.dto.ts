import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class CountOfDataDto {
  @ApiProperty({
    example: 'resourcesModel',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  modelName: string;

  @ApiProperty({
    example: { isDeleted: 0 },
    type: 'object',
    format: 'object',
    required: false,
  })
  @IsObject()
  @IsOptional()
  condition: object;
}
