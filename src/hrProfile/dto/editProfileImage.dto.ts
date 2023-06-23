import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class EditProfileImageDto {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  @IsOptional()
  profileImage?: Express.Multer.File;
}
