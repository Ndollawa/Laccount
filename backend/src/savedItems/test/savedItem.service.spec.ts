import { Test, TestingModule } from '@nestjs/testing';
import { SavedItemService } from '../savedItem.service';

describe('SavedItemService', () => {
  let service: SavedItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SavedItemService],
    }).compile();

    service = module.get<SavedItemService>(SavedItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
