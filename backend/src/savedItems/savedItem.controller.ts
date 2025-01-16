import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SavedItemService } from './savedItem.service';
import { CreateSavedItemDto, UpdateSavedItemDto } from './dto';
import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';

@Controller('savedItems')
@UseGuards(JwtAuthGuard)
export class SavedItemController {
  constructor(private readonly savedItemService: SavedItemService) {}

  @Get(':userId')
  async findOne(@Param('userId') userId: string) {
    return this.savedItemService.find(userId);
  }

  @Post(':userId')
  async create(
    @Param('userId') userId: string,
    @Body() createSaveWatchDto: CreateSavedItemDto,
  ) {
    return this.savedItemService.create(userId, createSaveWatchDto);
  }

  @Delete(':userId/:listingId')
  async remov(
    @Param('userId') userId: string,
    @Param('listingId') listingId: string,
  ) {
    return this.savedItemService.remove(userId, listingId);
  }
}
