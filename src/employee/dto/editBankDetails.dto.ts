import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class EditBankDetailsDto {
  @ApiProperty({
    example: 'SBI',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsOptional()
  bankName: string;

  @ApiProperty({
    example: 4003830171874018,
    type: 'number',
    format: 'number',
    required: true,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  bankAccountNo: number;

  @ApiProperty({
    example: 'Urvisha',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsOptional()
  accountHolderName: string;

  @ApiProperty({
    example: 'UTBI0DMCC46',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsOptional()
  ifscCode: string;
}
