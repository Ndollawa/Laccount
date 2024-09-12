import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

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
