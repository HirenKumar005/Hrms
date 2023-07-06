import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { Roles } from 'src/services/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/services/auth/guard/jwt.guard';
import { RolesGuard } from 'src/services/auth/guard/roles.guard';
import { storage } from 'src/services/multer';
import { Role } from 'src/utils/constants/roles';
import { AddEducation } from './dto/addEducation.dto';
import { DeleteEducation } from './dto/DeleteEducation.dto';
import { ViewEducation } from './dto/viewEducation.dto';
import { EducationService } from './education.service';

@Controller('api')
export class EducationController {
  constructor(private educationService: EducationService) {}

  @Roles(Role.HR, Role.Employee)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('addEducation')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('fileUpload', { storage: storage }))
  addEducation(
    @Body() dto: AddEducation,
    @UploadedFile() fileUpload: Express.Multer.File,
  ) {
    return this.educationService.addEducation(dto, fileUpload);
  }

  @Roles(Role.HR, Role.Admin, Role.Employee)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('viewEducation')
  viewEducation(@Body() dto: ViewEducation) {
    return this.educationService.viewEducation(dto);
  }

  @Roles(Role.HR, Role.Employee)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Put('deleteEducation')
  deleteEducation(@Body() dto: DeleteEducation) {
    return this.educationService.deleteEducation(dto);
  }
}
