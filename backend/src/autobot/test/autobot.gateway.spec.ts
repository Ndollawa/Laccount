import { Test, TestingModule } from '@nestjs/testing';
import { AutobotGateway } from '../autobot.gateway';

describe('AutobotGateway', () => {
  let gateway: AutobotGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutobotGateway],
    }).compile();

    gateway = module.get<AutobotGateway>(AutobotGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
