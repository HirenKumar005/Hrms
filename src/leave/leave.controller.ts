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
} from '@nestjs/common';
import { LeaveService } from './leave.service';
import { IdValidationDto } from './dto/findLeave.dto';
import { AddLeaveDto } from './dto/addLeave.dto';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { Roles } from 'src/services/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/services/auth/guard/jwt.guard';
import { RolesGuard } from 'src/services/auth/guard/roles.guard';
import { Role } from 'src/utils/constants/roles';
import { LeaveApprovalDto } from './dto/leaveApproval.dto';

@Controller('api')
export class LeaveController {
  constructor(private leaveService: LeaveService) {}

  // @Roles(Role.Admin)
  // @UseGuards(JwtGuard, RolesGuard)
  // @ApiBearerAuth()
  // @Post('admin/listOfLeave')
  // findLeave(@Body() dto: IdValidationDto) {
  //   return this.leaveService.findLeave(dto);
  // }

  //Employee can add Leave.
  @Roles(Role.HR, Role.Employee)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @Post('addLeave')
  addLeave(@Body() dto: AddLeaveDto) {
    return this.leaveService.addLeave(dto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('admin/listOfApplicants')
  listOfApplicants() {
    return this.leaveService.listOfApplicants();
  }

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Put('admin/leaveApproval')
  leaveApproval(@Body() dto: LeaveApprovalDto) {
    return this.leaveService.leaveApproval(dto);
  }
}
