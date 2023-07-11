import { Test, TestingModule } from '@nestjs/testing';
import { TasksheetOfSeniorsController } from './tasksheet-of-seniors.controller';
import { TasksheetOfSeniorsService } from './tasksheet-of-seniors.service';

describe('TasksheetOfSeniorsController', () => {
  let controller: TasksheetOfSeniorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksheetOfSeniorsController],
      providers: [TasksheetOfSeniorsService],
    }).compile();

    controller = module.get<TasksheetOfSeniorsController>(TasksheetOfSeniorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
