import { Test, TestingModule } from '@nestjs/testing';
import { AppsettingService } from '../appsetting.service';

describe('AppsettingService', () => {
  let service: AppsettingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppsettingService],
    }).compile();

    service = module.get<AppsettingService>(AppsettingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
