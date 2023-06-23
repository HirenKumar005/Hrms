import { Test, TestingModule } from '@nestjs/testing';
import { BankDetailsController } from './bankDetails.controller';
import { BankDetailsService } from './bankDetails.service';

describe('BankDetailsController', () => {
  let controller: BankDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankDetailsController],
      providers: [BankDetailsService],
    }).compile();

    controller = module.get<BankDetailsController>(BankDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
