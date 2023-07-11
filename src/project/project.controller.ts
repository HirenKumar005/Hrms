import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/services/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/services/auth/guard/jwt.guard';
import { Role } from 'src/utils/constants/roles';
import { ProjectService } from './project.service';
import { RolesGuard } from 'src/services/auth/guard/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AddProjectDto } from './dto/addProject.dto';
import { ListOfProjectDto } from './dto/listOfProject.dto';

@Controller('api')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Roles(Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('hr/project/addProject')
  addProject(@Body() dto: AddProjectDto) {
    return this.projectService.addProject(dto);
  }

  @Roles(Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('hr/project/listOfProject')
  listProject(@Body() dto: ListOfProjectDto) {
    return this.projectService.listProject(dto);
  }
}
