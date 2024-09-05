import { Test, TestingModule } from '@nestjs/testing';
import { AutobotService } from '../services/autobot.service';

describe('AutobotService', () => {
  let service: AutobotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutobotService],
    }).compile();

    service = module.get<AutobotService>(AutobotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
