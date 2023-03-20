import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RecruitmentService } from './recruitment.service';
import { AddRecruitmentDto } from './dto/addRecruitmentDto';
import { ApiBearerAuth, ApiParam, ApiConsumes } from '@nestjs/swagger';
import { storage } from 'src/services/multer';
import { Roles } from 'src/services/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/services/auth/guard/jwt.guard';
import { RolesGuard } from 'src/services/auth/guard/roles.guard';
import { Role } from 'src/utils/constants/roles';
import { addTechnicalRecruitmentDto } from './dto/addTechnicalRecruitmentDto';
import { EditTechnicalDetailsDto } from './dto/editTechnicalDetailsDto';

@Controller('api')
export class RecruitmentController {
  constructor(private recruitmentService: RecruitmentService) {}

  //HR can add the candidate.
  @Roles(Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @Post('hr/addRecruitment')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('resume', { storage: storage }))
  addRecruitment(
    @Body() dto: AddRecruitmentDto,
    @UploadedFile() resume: Express.Multer.File,
  ) {
    return this.recruitmentService.addRecruitment(dto, resume);
  }

  //HR can edit the candidate.
  @Roles(Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @Post('hr/addTechnicalRecruitment/:recruitmentId')
  addTechnicalRecruitment(
    @Param('recruitmentId') recruitmentId: number,
    @Body() dto: addTechnicalRecruitmentDto,
  ) {
    return this.recruitmentService.addTechnicalRecruitment(recruitmentId, dto);
  }

  // This API for Employee can view technical interview details which assigned to him/her.
  @Roles(Role.Employee)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('employee/listOfTechnicalInterviews/:userId')
  @ApiParam({ example: 1, name: 'userId', required: true })
  listOfTechnicalInterviews(@Param('userId') userId: number) {
    return this.recruitmentService.listOfTechnicalInterviews(userId);
  }

  //Employee can give the review of the candidate.
  @Roles(Role.Employee)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @Put('employee/editTechnicalInterviews/:recruitmentId')
  editTechnicalInterviews(
    @Param('recruitmentId') recruitmentId: number,
    @Body() dto: EditTechnicalDetailsDto,
  ) {
    return this.recruitmentService.editTechnicalInterviews(recruitmentId, dto);
  }

  //HR can view details of all candidates.
  @Roles(Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('hr/listOfRecruitment')
  listOfRecruitment() {
    return this.recruitmentService.listOfRecruitment();
  }
}
