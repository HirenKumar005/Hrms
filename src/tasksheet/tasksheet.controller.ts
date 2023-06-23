import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { Roles } from 'src/services/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/services/auth/guard/jwt.guard';
import { RolesGuard } from 'src/services/auth/guard/roles.guard';
import { Role } from 'src/utils/constants/roles';
import { AddTasksheet } from './dto/addTasksheet.dto';
import { ApprovalTimesheetDto } from './dto/approvalTasksheet.dto';
import { TasksheetService } from './tasksheet.service';

@Controller('api')
export class TasksheetController {
  constructor(private tasksheetService: TasksheetService) {}

  @Roles(Role.Employee, Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('addTasksheet')
  addTasksheet(@Body() dto: AddTasksheet) {
    return this.tasksheetService.addTasksheet(dto);
  }

  @Roles(Role.Employee, Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('viewTasksheet/:id')
  @ApiParam({ example: 1, name: 'id', required: true })
  viewTasksheet(@Param('id') id: number) {
    return this.tasksheetService.viewTasksheet(id);
  }

  @Roles(Role.Employee, Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('viewJuniorTasksheet/:id')
  @ApiParam({ example: 1, name: 'id', required: true })
  viewJuniorTasksheet(@Param('id') id: number) {
    return this.tasksheetService.viewJuniorTasksheet(id);
  }

  @Roles(Role.Employee, Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Put('approveTimesheet/:id')
  @ApiParam({ example: 1, name: 'id', required: true })
  approveTimesheet(@Body() dto: ApprovalTimesheetDto, @Param('id') id: number) {
    return this.tasksheetService.approveTimesheet(dto, id);
  }

  @Roles(Role.Employee, Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('listOfJuniorTasksheet/:addedBy')
  @ApiParam({ example: 1, name: 'addedBy', required: true })
  listOfJuniorTasksheet(@Param('addedBy') addedBy: number) {
    return this.tasksheetService.listOfJuniorTasksheet(addedBy);
  }
}
