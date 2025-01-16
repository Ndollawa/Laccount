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
import { PaymentGatewayService } from './paymentgateway.service';
import { CreatePaymentGatewayDto, UpdatePaymentGatewayDto } from './dto/';
import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
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

  @Post('process-payment')
  processPayment(
    @Body()
    {
      transactionId,
      amount,
      paymentMethod,
    }: {
      transactionId: string;
      amount: number;
      paymentMethod: string;
    },
  ) {
    return this.paymentGatewayService.processPayment(
      transactionId,
      amount,
      paymentMethod,
    );
  }
}
