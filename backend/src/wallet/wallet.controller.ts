import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto, UpdateWalletDto } from './dto';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletervice: WalletService) {}

  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletervice.create(createWalletDto);
  }

  @Post('topup')
  topUp(@Body() amount: number | string) {
    // return this.walletervice.topUpWallet(amount);
  }

  @Get()
  findAll() {
    return this.walletervice.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walletervice.find(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletervice.update(id, updateWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletervice.remove(id);
  }
}
