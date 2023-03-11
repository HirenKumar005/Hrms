import { Body, Controller, Post } from '@nestjs/common';
import { CountOfDataService } from './countOfData.service';
import { CountOfDataDto } from './dto/countOfData.dto';

@Controller('api')
export class CountOfDataController {
  constructor(private readonly countOfDataService: CountOfDataService) {}

  @Post('countData')
  listOfData(@Body() dto: CountOfDataDto) {
    return this.countOfDataService.countOfData(dto);
  }
}
