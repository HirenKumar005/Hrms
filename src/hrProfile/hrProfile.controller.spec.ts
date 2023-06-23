import { Test, TestingModule } from '@nestjs/testing';
import { HrProfileController } from './hrProfile.controller';

describe('HrProfileController', () => {
  let controller: HrProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HrProfileController],
    }).compile();

    controller = module.get<HrProfileController>(HrProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
