import { Module } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { TestimonialService } from './testimonial.service';
import { TestimonialRepository } from './testimonial.repository';
import { TestimonialController } from './testimonial.controller';

@Module({
  controllers: [TestimonialController],
  providers: [TestimonialService, TestimonialRepository, PrismaService],
})
export class TestimonialModule {}
