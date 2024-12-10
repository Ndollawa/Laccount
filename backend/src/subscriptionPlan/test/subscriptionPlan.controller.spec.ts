import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionPlanController } from '../subscriptionPlan.controller';
import { SubscriptionPlanService } from '../subscriptionPlan.service';

describe('SubscriptionPlanController', () => {
  let controller: SubscriptionPlanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionPlanController],
      providers: [SubscriptionPlanService],
    }).compile();

    controller = module.get<SubscriptionPlanController>(
      SubscriptionPlanController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
