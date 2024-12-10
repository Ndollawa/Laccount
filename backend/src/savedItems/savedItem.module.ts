import { Module } from '@nestjs/common';
import { SavedItemService } from './savedItem.service';
import { SavedItemRepository } from './savedItem.repository';
import { SavedItemController } from './savedItem.controller';

@Module({
  controllers: [SavedItemController],
  providers: [SavedItemRepository, SavedItemService],
  exports: [SavedItemService],
})
export class SavedItemModule {}
