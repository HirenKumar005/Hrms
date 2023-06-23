import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { Roles } from 'src/services/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/services/auth/guard/jwt.guard';
import { RolesGuard } from 'src/services/auth/guard/roles.guard';
import { Role } from 'src/utils/constants/roles';
import { DashboardService } from './dashboard.service';
import { ListOfSupportsDto } from './dto/listOfSupports.dto';

@Controller('api')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Roles(Role.HR, Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('pieChart')
  pieChart() {
    return this.dashboardService.pieChart();
  }

  @Roles(Role.HR, Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('recentlyRegistration')
  recentlyRegistration() {
    return this.dashboardService.recentlyRegistration();
  }

  @Roles(Role.Admin, Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('listOfSupports')
  listOfSupports(@Body() dto: ListOfSupportsDto) {
    return this.dashboardService.listOfSupports(dto);
  }
}
