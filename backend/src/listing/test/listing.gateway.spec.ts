import { Test, TestingModule } from '@nestjs/testing';
import { ListingGateway } from '../listing.gateway';

describe('ListingGateway', () => {
  let gateway: ListingGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListingGateway],
    }).compile();

    gateway = module.get<ListingGateway>(ListingGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
