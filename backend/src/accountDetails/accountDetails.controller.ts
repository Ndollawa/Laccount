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
import { AccountDetailsService } from './accountDetails.service';
import { CreateAccountDetailsDto, UpdateAccountDetailsDto } from './dto/';
import { CreateListingDto } from 'src/listing/dto';
import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';

@Controller('account-details')
export class AccountDetailsController {
  constructor(private readonly accountDetailsService: AccountDetailsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createAccountDetailsDto: CreateAccountDetailsDto & CreateListingDto,
  ) {
    return this.accountDetailsService.create(createAccountDetailsDto);
  }

  @Get()
  findAll() {
    return this.accountDetailsService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountDetailsService.find(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAccountDetailsDto: UpdateAccountDetailsDto,
  ) {
    return this.accountDetailsService.update(id, updateAccountDetailsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountDetailsService.remove(id);
  }
}
