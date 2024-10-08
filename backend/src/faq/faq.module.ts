import { Module } from '@nestjs/common';
import { FaqService } from './faq.service';
import { FaqRepository } from './faq.repository';
import { FaqController } from './faq.controller';

@Module({
  controllers: [FaqController],
  providers: [FaqService, FaqRepository],
})
export class FaqModule {}
