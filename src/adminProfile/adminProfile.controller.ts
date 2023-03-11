import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiParam } from '@nestjs/swagger';
import { Roles } from 'src/services/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/services/auth/guard/jwt.guard';
import { RolesGuard } from 'src/services/auth/guard/roles.guard';
import { storage } from 'src/services/multer';
import { Role } from 'src/utils/constants/roles';
import { AdminProfileService } from './adminProfile.service';
import { AddEmployeeDto } from './dto/addEmployee.dto';
import { AdminLoginDto } from './dto/adminLogin.dto';
import { EditAdminDto } from './dto/editAdmin.dto';

@Controller('api')
export class AdminProfileController {
  constructor(private adminProfileService: AdminProfileService) {}

  // Admin can add Employee and HR.
  @Roles(Role.Admin, Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @Post('addEmployee')
  addEmployee(@Body() dto: AddEmployeeDto) {
    return this.adminProfileService.addEmployee(dto);
  }

  // This API for Admin can login.
  @HttpCode(HttpStatus.OK)
  @Post('login')
  adminLogin(@Body() dto: AdminLoginDto) {
    return this.adminProfileService.login(dto);
  }

  // This API for admin can view profile.
  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('admin/viewProfile/:adminId')
  @ApiParam({ example: 1, name: 'adminId', required: true })
  viewProfile(@Param('adminId') adminId: number) {
    return this.adminProfileService.viewProfile(adminId);
  }

  // This API for admin can edit profile.
  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Put('admin/editProfile/:adminId')
  @ApiParam({ example: 1, name: 'adminId', required: true })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('profileImage', { storage: storage }))
  editProfile(
    @Param('adminId') adminId: number,
    @Body() dto: EditAdminDto,
    @UploadedFile() profileImage: Express.Multer.File,
  ) {
    return this.adminProfileService.editProfile(adminId, dto, profileImage);
  }
}
