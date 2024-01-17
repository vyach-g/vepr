import { Test, TestingModule } from '@nestjs/testing';
import { UssesController } from './usses.controller';
import { UssesService } from './usses.service';

describe('UssesController', () => {
  let controller: UssesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UssesController],
      providers: [UssesService],
    }).compile();

    controller = module.get<UssesController>(UssesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
