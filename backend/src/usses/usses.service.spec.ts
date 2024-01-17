import { Test, TestingModule } from '@nestjs/testing';
import { UssesService } from './usses.service';

describe('UssesService', () => {
  let service: UssesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UssesService],
    }).compile();

    service = module.get<UssesService>(UssesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
