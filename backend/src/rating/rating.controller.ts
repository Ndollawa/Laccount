import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  // @Post()
  // create(@Body() createAccountDto: CreateAccountDto & CreateListingDto) {
  //   return this.accountService.createAccount(createAccountDto);
  // }

  // @Get()
  // findAll() {
  //   return this.accountService.findAllAccounts({});
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.accountService.findAccount(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
  //   return this.accountService.updateAccount(id, updateAccountDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.accountService.removeAccount(id);
  // }
}
