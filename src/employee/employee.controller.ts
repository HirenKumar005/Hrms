import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AddBankDetailsDto } from './dto/addBankDetails.dto';
import { EditBankDetailsDto } from './dto/editBankDetails.dto';
import { EmployeeService } from './employee.service';
import { Roles } from 'src/services/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/services/auth/guard/jwt.guard';
import { RolesGuard } from 'src/services/auth/guard/roles.guard';
import { Role } from 'src/utils/constants/roles';
import { DeleteEmployeeDto } from './dto/deleteEmployee.dto';
import { ListOfEmployeeDto } from './dto/listOfEmployee.dto';

@Controller('api')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('/admin/addBankDetails')
  addBankDetails(@Body() dto: AddBankDetailsDto) {
    return this.employeeService.addBankDetails(dto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Put('/admin/editBankDetails/:employeeId')
  @ApiParam({ example: 1, name: 'employeeId', required: true })
  editBankDetails(
    @Param('employeeId') employeeId: number,
    @Body() dto: EditBankDetailsDto,
  ) {
    return this.employeeService.editBankDetails(dto, employeeId);
  }

  @Roles(Role.Admin, Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Put('deleteEmployee/:employeeId')
  @ApiParam({ example: 1, name: 'employeeId', required: true })
  deleteEmployee(
    @Param('employeeId') employeeId: number,
    @Body() dto: DeleteEmployeeDto,
  ) {
    return this.employeeService.deleteEmployee(employeeId, dto);
  }

  @Roles(Role.Admin, Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('listOfEmployee')
  listOfEmployee(@Body() dto: ListOfEmployeeDto) {
    return this.employeeService.listOfEmployee(dto);
  }
}
