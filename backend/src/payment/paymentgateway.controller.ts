import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentGatewayService } from './paymentgateway.service';
import { CreatePaymentGatewayDto, UpdatePaymentGatewayDto } from './dto/';

@Controller('payments')
export class PaymentGatewayController {
  constructor(private readonly paymentGatewayService: PaymentGatewayService) {}

  @Post()
  create(@Body() createPaymentGatewayDto: CreatePaymentGatewayDto) {
    return this.paymentGatewayService.create(createPaymentGatewayDto);
  }

  @Get()
  findAll() {
    return this.paymentGatewayService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentGatewayService.find(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentGatewayDto: UpdatePaymentGatewayDto,
  ) {
    return this.paymentGatewayService.update(id, updatePaymentGatewayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentGatewayService.remove(id);
  }
}
