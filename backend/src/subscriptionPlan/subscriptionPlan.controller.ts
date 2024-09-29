import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubscriptionPlanService } from './subscriptionPlan.service';
import { CreateSubscriptionPlanDto, UpdateSubscriptionPlanDto } from './dto';

@Controller('subscriptionPlans')
export class SubscriptionPlanController {
  constructor(
    private readonly subscriptionPlanService: SubscriptionPlanService,
  ) {}

  @Post()
  create(@Body() createSubscriptionPlanDto: CreateSubscriptionPlanDto) {
    return this.subscriptionPlanService.create(createSubscriptionPlanDto);
  }

  @Get()
  findAll() {
    return this.subscriptionPlanService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionPlanService.find(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubscriptionPlanDto: UpdateSubscriptionPlanDto,
  ) {
    return this.subscriptionPlanService.update(id, updateSubscriptionPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscriptionPlanService.remove(id);
  }
}
