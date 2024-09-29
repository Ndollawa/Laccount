import { Module } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { RatingService } from './rating.service';
import { RatingRepository } from './rating.repository';
import { RatingController } from './rating.controller';

@Module({
  controllers: [RatingController],
  providers: [RatingService, RatingRepository, PrismaService],
})
export class RatingModule {}
