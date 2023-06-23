import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { Roles } from 'src/services/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/services/auth/guard/jwt.guard';
import { RolesGuard } from 'src/services/auth/guard/roles.guard';
import { Role } from 'src/utils/constants/roles';
import { BankDetailsService } from './bankDetails.service';

@Controller('api')
export class BankDetailsController {
  constructor(private bankDetailsService: BankDetailsService) {}

  @Roles(Role.Admin, Role.HR, Role.Employee)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('viewBankDetails/:id')
  @ApiParam({ example: 1, name: 'id', required: true })
  viewBankDetails(@Param('id') id: number) {
    return this.bankDetailsService.viewBankDetails(id);
  }
}
