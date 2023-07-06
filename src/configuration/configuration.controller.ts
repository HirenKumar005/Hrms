import { Controller, Post, Body, Param, UseGuards, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { Roles } from 'src/services/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/services/auth/guard/jwt.guard';
import { RolesGuard } from 'src/services/auth/guard/roles.guard';
import { Role } from 'src/utils/constants/roles';
import { ConfigurationService } from './configuration.service';
import { AddConfigurationDto } from './dto/addConfiguration.dto';
import { EditConfigurationDto } from './dto/editConfiguration.dto';
import { ListOfConfigurationDto } from './dto/listOfConfiguration.dto';

@Controller('api')
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) {}

  // HR can add configuration.
  @Roles(Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @Post('hr/addConfiguration')
  addConfiguration(@Body() dto: AddConfigurationDto) {
    return this.configurationService.addConfiguration(dto);
  }

  // HR can edit configuration.
  @Roles(Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiParam({ example: 1, name: 'hrId', required: true })
  @Put('hr/editConfiguration/:hrId')
  editConfiguration(@Param('hrId') hrId: number, @Body() dto: EditConfigurationDto) {
    return this.configurationService.editConfiguration(hrId, dto);
  }

  // HR can view list of configuration and view configuration by id.
  @Roles(Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @Post('hr/listOfConfiguration')
  listOfConfiguration(@Body() dto: ListOfConfigurationDto) {
    return this.configurationService.listOfConfiguration(dto);
  }
}
