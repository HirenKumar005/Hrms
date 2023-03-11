import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddBankDetailsDto {
  @ApiProperty({ example: 1, type: 'number', format: 'number', required: true })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: 'SBI',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  bankName: string;

  @ApiProperty({
    example: 4003830171874018,
    type: 'number',
    format: 'number',
    required: true,
  })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  bankAccountNo: number;

  @ApiProperty({
    example: 'Urvisha',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  accountHolderName: string;

  @ApiProperty({
    example: 'UTBI0DMCC46',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  ifscCode: string;
}
