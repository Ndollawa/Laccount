import { Test, TestingModule } from '@nestjs/testing';
import { SavedItemController } from '../savedItem.controller';
import { SavedItemService } from '../savedItem.service';

describe('SavedItemController', () => {
  let controller: SavedItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SavedItemController],
      providers: [SavedItemService],
    }).compile();

    controller = module.get<SavedItemController>(SavedItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
