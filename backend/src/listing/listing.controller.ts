import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ListingService } from './listing.service';
import { CreateListingDto, UpdateListingDto } from './dto';
import { CreateAccountDetailsDto } from 'src/accountDetails/dto';

@Controller('listings')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}
  @Post()
  create(@Body() createListingDto: CreateListingDto & CreateAccountDetailsDto) {
    return this.listingService.create(createListingDto);
  }

  @Get()
  findAll() {
    return this.listingService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listingService.find(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatelistingDto: UpdateListingDto) {
    return this.listingService.update(id, updatelistingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listingService.remove(id);
  }
}
