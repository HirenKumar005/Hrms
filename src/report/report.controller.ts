import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/services/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/services/auth/guard/jwt.guard';
import { RolesGuard } from 'src/services/auth/guard/roles.guard';
import { Role } from 'src/utils/constants/roles';
import { ReportService } from './report.service';
import { ReportDto } from './dto/employeeTimeSheet.dto';
import { ResourceDto } from './dto/resourceReport.dto';
import { RecruitmentDto } from './dto/recruitmentReport.dto';

@Controller('api/admin/report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('/employeeTimeSheet')
  employeeTimeSheet(@Body() dto: ReportDto) {
    return this.reportService.employeeTimeSheet(dto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('/resourceReport')
  resourceReport(@Body() dto: ResourceDto) {
    return this.reportService.resourceReport(dto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('/resourceAllocatedReport')
  resourceAllocatedReport(@Body() dto: ResourceDto) {
    return this.reportService.resourceAllocatedReport(dto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('/recruitmentReport')
  recruitmentReport(@Body() dto: RecruitmentDto) {
    return this.reportService.recruitmentReport(dto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('/damageResourceReport')
  damageResourceReport(@Body() dto: ResourceDto) {
    return this.reportService.damageResourceReport(dto);
  }
};
