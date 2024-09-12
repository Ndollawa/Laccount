import { Test, TestingModule } from '@nestjs/testing';
import { AppsettingsController } from '../appsettings.controller';
import { AppsettingsService } from '../appsettings.service';

describe('AppsettingsController', () => {
  let controller: AppsettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppsettingsController],
      providers: [AppsettingsService],
    }).compile();

    controller = module.get<AppsettingsController>(AppsettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
