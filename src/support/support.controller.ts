import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { Roles } from 'src/services/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/services/auth/guard/jwt.guard';
import { RolesGuard } from 'src/services/auth/guard/roles.guard';
import { Role } from 'src/utils/constants/roles';
import { AddSupport } from './dto/addSupport.dto';
import { SupportService } from './support.service';

@Controller('api')
export class SupportController {
  constructor(private supportService: SupportService) {}

  @Roles(Role.HR, Role.Employee)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('addSupport')
  addSupport(@Body() dto: AddSupport) {
    return this.supportService.addSupport(dto);
  }

  @Roles(Role.HR, Role.Employee)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('viewSupport/:id')
  @ApiParam({ example: 1, name: 'id', required: true })
  viewSupportByHR(@Param('id') id: number) {
    return this.supportService.viewSupport(id);
  }

  @Roles(Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('hr/listSupportDataOfEmployee')
  viewSupportByEmployee() {
    return this.supportService.listSupportDataOfEmployee();
  }
}
