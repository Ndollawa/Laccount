import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PaymentGateway, GatewayMode } from '@prisma/client';
import { handleError } from '@app/common';
import { CreatePaymentGatewayDto, UpdatePaymentGatewayDto } from './dto';
import { PaymentGatewayRepository } from './paymentgateway.repository';

@Injectable()
export class PaymentGatewayService {
  constructor(
    protected readonly paymentGatewayRepository: PaymentGatewayRepository,
  ) {}

  async find(id: any): Promise<PaymentGateway> {
    try {
      return await this.paymentGatewayRepository.find({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(query: any): Promise<PaymentGateway[]> {
    try {
      return await this.paymentGatewayRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }
  async remove(id: string): Promise<PaymentGateway> {
    try {
      return await this.paymentGatewayRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }
  async create(
    createPaymentGatewayData: CreatePaymentGatewayDto,
  ): Promise<PaymentGateway> {
    const {
      name,
      publicKey,
      secretKey,
      webhookSecret,
      merchantId,
      mode,
      isActive,
      supportedCurrencies,
      country,
    } = createPaymentGatewayData;

    try {
      const existingPaymentGateway = await this.paymentGatewayRepository.exists(
        {
          where: { name },
        },
      );

      if (existingPaymentGateway) {
        throw new HttpException(
          'Payment  Gateway with credentials already exists.',
          HttpStatus.CONFLICT,
        );
      }

      const PaymentGatewayData = {
        ...createPaymentGatewayData,
      };

      const newPaymentGateway = await this.paymentGatewayRepository.create({
        data: PaymentGatewayData,
      });
      Logger.debug(newPaymentGateway);
      return newPaymentGateway;
    } catch (error) {
      Logger.log(error);
      handleError(error);
    }
  }

  async update(id: string, updatePaymentGatewayData: UpdatePaymentGatewayDto) {
    try {
      return await this.paymentGatewayRepository.update({
        where: { id },
        data: updatePaymentGatewayData,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(id: string, updatePaymentGatewayData: UpdatePaymentGatewayDto) {
    try {
      return await this.paymentGatewayRepository.upsert({
        where: { id },
        data: updatePaymentGatewayData,
      });
    } catch (error) {
      handleError(error);
    }
  }
}
