import {
  Controller,
  Post,
  Body,
  Put,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ItpService } from './itp.service';
import { IdValidationDto } from './dto/findCourse.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/services/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/services/auth/guard/jwt.guard';
import { RolesGuard } from 'src/services/auth/guard/roles.guard';
import { Role } from 'src/utils/constants/roles';
import { DeleteCourse } from './dto/deleteCourse.dto';
import { TopicDto } from './dto/addTopic.dto';
import { UpdateTopicDto } from './dto/updateTopic.dto';
import { DeleteTopic } from './dto/deleteTopic.dto';
import { AssignCourse } from './dto/assignCourse.dto';
import { FindAssignCourse } from './dto/findUserCourseAssign.dto';

@Controller('api/itp')
export class ItpController {
  constructor(private itpService: ItpService) {}

  @Roles(Role.Admin, Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('/addCourse')
  addCourse(@Body() dto: TopicDto) {
    return this.itpService.addCourse(dto);
  }

  @Roles(Role.Admin, Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @Put('/updateTopic')
  updateTopic(@Body() dto: UpdateTopicDto) {
    return this.itpService.updateTopic(dto);
  }

  @Roles(Role.Admin, Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @Put('/deleteCourse')
  deleteCourse(@Body() dto: DeleteCourse) {
    return this.itpService.updateCourse(dto);
  }

  @Roles(Role.Admin, Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @Put('/deleteTopic')
  deleteTopic(@Body() dto: DeleteTopic) {
    return this.itpService.deleteTopic(dto);
  }

  @Roles(Role.Admin, Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @Post('/listOfTopics')
  findTopic(@Body() dto: IdValidationDto) {
    return this.itpService.findTopic(dto);
  }

  @Roles(Role.Admin, Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('/assignCourse')
  assignCourse(@Body() dto: AssignCourse) {
    return this.itpService.assignCourse(dto);
  }

  @Roles(Role.Employee)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('/findAssignCourse')
  findAssignCourse(@Body() dto: FindAssignCourse) {
    return this.itpService.findAssignCourse(dto);
  }
}
