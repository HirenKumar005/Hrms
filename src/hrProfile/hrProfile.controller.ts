import { Body, Controller, Get, HttpCode, HttpStatus, Param, Put, UploadedFile, UseGuards, UseInterceptors, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiParam } from '@nestjs/swagger';
import { Roles } from 'src/services/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/services/auth/guard/jwt.guard';
import { RolesGuard } from 'src/services/auth/guard/roles.guard';
import { storage } from 'src/services/multer';
import { Role } from 'src/utils/constants/roles';
import { EditProfileDto } from './dto/editProfile.dto';
import { EditProfileImageDto } from './dto/editProfileImage.dto';
import { HrProfileService } from './hrProfile.service';

@Controller('api')
export class HrProfileController {
    constructor(private hrProfileService: HrProfileService) {}

// This API for HR and Employee can view profile.
  @Roles(Role.Admin, Role.HR, Role.Employee)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('viewProfile/:id')
  @ApiParam({ example: 1, name: 'id', required: true })
  viewProfile(@Param('id') id: number) {
    return this.hrProfileService.viewProfile(id);
  }

  // This API for HR and Employee can edit profile.
  @Roles(Role.HR, Role.Employee)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Put('editProfile/:id')
  @ApiParam({ example: 1, name: 'id', required: true })
  editProfile(
    @Param('id') id: number,
    @Body() dto: EditProfileDto,
  ) {
    return this.hrProfileService.editProfile(id, dto,);
  }

  // This API for HR and Employee can edit profile.
  @Roles(Role.HR, Role.Employee)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Put('editProfileImage/:id')
  @ApiParam({ example: 1, name: 'id', required: true })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('profileImage', { storage: storage }))
  editProfileImage(
    @Param('id') id: number,
    @UploadedFile() profileImage: Express.Multer.File,
    @Body() dto: EditProfileImageDto,
  ) {
    return this.hrProfileService.editProfileImage(id, profileImage);
  }
}
