import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/services/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/services/auth/guard/jwt.guard';
import { RolesGuard } from 'src/services/auth/guard/roles.guard';
import { Role } from 'src/utils/constants/roles';
import { SeniorAddTasksheetDto } from './dto/seniorAddTasksheet.dto';
import { TasksheetOfSeniorsService } from './tasksheet-of-seniors.service';

@Controller()
export class TasksheetOfSeniorsController {
  constructor(
    private readonly tasksheetOfSeniorsService: TasksheetOfSeniorsService
  ) {}

  @Roles(Role.Employee, Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('employee/tasksheet/seniorAddTasksheet')
  addTasksheet(@Body() dto: SeniorAddTasksheetDto) {
    return this.tasksheetOfSeniorsService.seniorAddTasksheet(dto);
  }
}
