import { Test, TestingModule } from '@nestjs/testing';
import { AppsettingController } from '../appsetting.controller';
import { AppsettingService } from '../appsetting.service';

describe('AppsettingController', () => {
  let controller: AppsettingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppsettingController],
      providers: [AppsettingService],
    }).compile();

    controller = module.get<AppsettingController>(AppsettingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
