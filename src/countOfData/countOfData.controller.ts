import {
  Body,
  Controller,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CountOfDataService } from './countOfData.service';
import { CountOfDataDto } from './dto/countOfData.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/services/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/services/auth/guard/jwt.guard';
import { RolesGuard } from 'src/services/auth/guard/roles.guard';
import { Role } from 'src/utils/constants/roles';
import { CountOfMultipleCardData } from './dto/countOfMultipleCardData.dto';

@Controller('api')
export class CountOfDataController {
  constructor(private readonly countOfDataService: CountOfDataService) {}

  @Post('countData')
  listOfData(@Body() dto: CountOfDataDto) {
    return this.countOfDataService.countOfData(dto);
  }

  @Roles(Role.Admin, Role.HR)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('countOfMultipleCardData')
  countOfMultipleEmployeeCardData(@Body() dto: CountOfMultipleCardData) {
    return this.countOfDataService.countOfMultipleCardData(dto);
  }
}
