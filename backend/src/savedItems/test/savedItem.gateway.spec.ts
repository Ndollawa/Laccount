import { Test, TestingModule } from '@nestjs/testing';
import { SavedItemGateway } from '../savedItem.gateway';

describe('SavedItemGateway', () => {
  let gateway: SavedItemGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SavedItemGateway],
    }).compile();

    gateway = module.get<SavedItemGateway>(SavedItemGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
