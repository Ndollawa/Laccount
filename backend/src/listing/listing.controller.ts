import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListingService } from './listing.service';
import { CreateListingDto , UpdateListingDto} from './dto';
import { CreateAccountDto } from 'src/account/dto';

@Controller('listing')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}
  @Post()
  create(@Body() createListingDto: CreateListingDto & CreateAccountDto) {
    return this.listingService.createListing(createListingDto);
  }

  @Get()
  findAll() {
    return this.listingService.findAllListings({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listingService.findListing(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatelistingDto: UpdateListingDto) {
    return this.listingService.updateListing(id, updatelistingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listingService.removeListing(id);
  }
}
