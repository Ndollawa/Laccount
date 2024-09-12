import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { CreateListingDto } from 'src/listing/dto';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto & CreateListingDto) {
    return this.accountService.createAccount(createAccountDto);
  }

  @Get()
  findAll() {
    return this.accountService.findAllAccounts({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findAccount(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.updateAccount(id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountService.removeAccount(id);
  }
}
