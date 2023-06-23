import { Test, TestingModule } from '@nestjs/testing';
import { TasksheetController } from './tasksheet.controller';
import { TasksheetService } from './tasksheet.service';

describe('SupportController', () => {
  let controller: TasksheetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksheetController],
      providers: [TasksheetService],
    }).compile();

    controller = module.get<TasksheetController>(TasksheetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
