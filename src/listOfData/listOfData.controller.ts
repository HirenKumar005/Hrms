import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { ListOfDataDto } from './dto/listOfData.dto';
import { ListOfDataService } from './listOfData.service';

@Controller('api')
export class ListOfDataController {
  constructor(private listOfDataService: ListOfDataService) {}
  
  // This API for list of data.
  @Post('listOfData')
  listOfData(@Body() dto: ListOfDataDto) {
    return this.listOfDataService.listOfData(dto);
  }
}
