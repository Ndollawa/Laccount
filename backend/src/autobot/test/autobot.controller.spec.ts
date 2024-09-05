import { Test, TestingModule } from '@nestjs/testing';
import { AutobotController } from '../autobot.controller';

describe('AutobotController', () => {
  let controller: AutobotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutobotController],
    }).compile();

    controller = module.get<AutobotController>(AutobotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
