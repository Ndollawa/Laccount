import { Module } from '@nestjs/common';
import { ListingService } from './listing.service';
import { ListingRepository } from './listing.repository';
import { ListingController } from './listing.controller';

@Module({
  controllers: [ListingController],
  providers: [ListingRepository, ListingService],
  exports: [ListingService],
})
export class ListingModule {}
