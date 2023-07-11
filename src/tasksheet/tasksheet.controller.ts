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
import { AddTaskSheet } from './dto/addTaskSheet.dto';
import { ApprovalTimesheetDto } from './dto/approvalTasksheet.dto';
import { TaskSheetService } from './taskSheet.service';
import { EditTaskSheetDto } from './dto/editTaskSheet.dto';

@Controller('api')
export class TaskSheetController {
  constructor(private taskSheetService: TaskSheetService) {}

  @Roles(Role.Employee, Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('addTaskSheet')
  addTaskSheet(@Body() dto: AddTaskSheet) {
    return this.taskSheetService.addTaskSheet(dto);
  }

  @Roles(Role.Employee, Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Put('editTaskSheet/:taskSheetId')
  @ApiParam({ example: 1, name: 'taskSheetId', required: true })
  editTaskSheet(
    @Param('taskSheetId') taskSheetId: number,
    @Body() dto: EditTaskSheetDto
  ) {
    return this.taskSheetService.editTaskSheet(taskSheetId, dto);
  }

  @Roles(Role.Employee, Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('viewTasksheet/:id')
  @ApiParam({ example: 1, name: 'id', required: true })
  viewTasksheet(@Param('id') id: number) {
    return this.taskSheetService.viewTasksheet(id);
  }

  @Roles(Role.Employee, Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('viewJuniorTasksheet/:id')
  @ApiParam({ example: 1, name: 'id', required: true })
  viewJuniorTasksheet(@Param('id') id: number) {
    return this.taskSheetService.viewJuniorTasksheet(id);
  }

  @Roles(Role.Employee, Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Put('approveTimesheet/:id')
  @ApiParam({ example: 1, name: 'id', required: true })
  approveTimesheet(@Body() dto: ApprovalTimesheetDto, @Param('id') id: number) {
    return this.taskSheetService.approveTimesheet(dto, id);
  }

  @Roles(Role.Employee, Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('listOfJuniorTasksheet/:addedBy')
  @ApiParam({ example: 1, name: 'addedBy', required: true })
  listOfJuniorTasksheet(@Param('addedBy') addedBy: number) {
    return this.taskSheetService.listOfJuniorTasksheet(addedBy);
  }
}
