import { Test, TestingModule } from '@nestjs/testing';
import { TaskSheetController } from './taskSheet.controller';
import { TaskSheetService } from './taskSheet.service';

describe('SupportController', () => {
  let controller: TaskSheetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskSheetController],
      providers: [TaskSheetService],
    }).compile();

    controller = module.get<TaskSheetController>(TaskSheetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
