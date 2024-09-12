import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Payment, PaymentStatus } from '@prisma/client';
import { handleError } from '@app/common';
import { CreatePaymentDto, UpdatePaymentDto} from './dto';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class PaymentService {
  constructor(protected readonly paymentRepository: PaymentRepository) {}

  async find(id: any): Promise<Payment> {
    try {
      return await this.paymentRepository.find({
        where: { id },
        include: { author: true },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(query: any): Promise<Payment[]> {
    try {
      return await this.paymentRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }
  async remove(id: string): Promise<Payment> {
    try {
      return await this.paymentRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }
  async create(createPaymentData: CreatePaymentDto): Promise<Payment> {
    const {
      title ,
      // body ,
      // description ,
      // image ,
      // tags ,
      // authorId , 
     } = createPaymentData;

    try {
      const existingPayment = await this.paymentRepository.exists({
        where: { title },
      });

      if (existingPayment) {
        throw new HttpException(
          'Payment with credentials already exists.',
          HttpStatus.CONFLICT,
        );
      }

      const PaymentData = {
        ...createPaymentData,
        status: PaymentStatus.PUBLISHED,
      readCount: 12, 
      readingTime: '12 minutes' ,
      };

      const newPayment = await this.paymentRepository.create({
        data: PaymentData,
      });
      Logger.debug(newPayment);
      return newPayment;
    } catch (error) {
      Logger.log(error);
      handleError(error);
    }
  }

  async update(id: string, updatePaymentData: UpdatePaymentDto) {
    try {
      return await this.paymentRepository.update({
        where: { id },
        data: updatePaymentData,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(id: string, updatePaymentData: UpdatePaymentDto) {
    try {
      return await this.paymentRepository.upsert({
        where: { id },
        data: updatePaymentData,
      });
    } catch (error) {
      handleError(error);
    }
  }
}

