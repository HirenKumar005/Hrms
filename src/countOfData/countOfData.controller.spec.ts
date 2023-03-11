import { Test, TestingModule } from '@nestjs/testing';
import { CountOfDataController } from './countOfData.controller';
import { CountOfDataService } from './countOfData.service';

describe('CountOfDataController', () => {
  let controller: CountOfDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountOfDataController],
      providers: [CountOfDataService],
    }).compile();

    controller = module.get<CountOfDataController>(CountOfDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
