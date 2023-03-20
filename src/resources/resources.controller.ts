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
import { AddResources } from './dto/addResources.dto';
import { DamagedResourcesDto } from './dto/damagedResources.dto';
import { FindAllocateDevice } from './dto/findAllocate.dto';
import { ResourcesAllocation } from './dto/resourcesAllocation.dto';
import { ResourcesReallocation } from './dto/resourcesReallocation.dto';
import { ResourcesService } from './resources.service';

@Controller('api')
export class ResourcesController {
  constructor(private resourcesService: ResourcesService) {}

  @Roles(Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('hr/resources/addResources')
  addResources(@Body() dto: AddResources) {
    return this.resourcesService.addResources(dto);
  }

  @Roles(Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('hr/resources/resourcesAllocation')
  resourcesAllocation(@Body() dto: ResourcesAllocation) {
    return this.resourcesService.resourcesAllocation(dto);
  }

  @Roles(Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('hr/resources/findDevices')
  findDevices(@Body() dto: FindAllocateDevice) {
    return this.resourcesService.findDevices(dto);
  }

  @Roles(Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('hr/resources/resourcesReallocation')
  resourcesReallocation(@Body() dto: ResourcesReallocation) {
    return this.resourcesService.resourcesAllocation(dto);
  }

  @Roles(Role.HR, Role.Employee)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('listOfResources/:id')
  @ApiParam({ example: 1, name: 'id', required: true })
  listOfResources(@Param('id') id: number) {
    return this.resourcesService.listOfResources(id);
  }

  @Roles(Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('hr/resources/listOfAllocation')
  listOfAllocation() {
    return this.resourcesService.listOfAllocation();
  }

  @Roles(Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('hr/resources/damagedResources')
  damagedResources(@Body() dto: DamagedResourcesDto) {
    return this.resourcesService.damagedResources(dto);
  }

  @Roles(Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('hr/resources/listOfReallocation')
  listOfReallocation() {
    return this.resourcesService.listOfReallocation();
  }

  @Roles(Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('hr/resources/listOfDamagedResources')
  listOfDamagedResources() {
    return this.resourcesService.listOfDamagedResources();
  }

  @Roles(Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('hr/countOfMultipleConfigurationData')
  countOfMultipleConfigurationData() {
    return this.resourcesService.countOfMultipleConfigurationData();
  }
}
