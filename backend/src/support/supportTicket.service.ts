import { Injectable, Logger } from '@nestjs/common';
import {
  SupportTicket,
  TicketStatus,
  TicketPriority,
  TicketCategory,
} from '@prisma/client';
import { handleError } from '@app/common';
import { CreateSupportTicketDto, UpdateSupportTicketDto } from './dto';
import { SupportTicketRepository } from './supportTicket.repository';

@Injectable()
export class SupportTicketService {
  constructor(
    protected readonly supportTicketRepository: SupportTicketRepository,
  ) {}

  async find(id: string): Promise<SupportTicket> {
    try {
      return await this.supportTicketRepository.find({
        where: { id },
        // include: { author: true },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(query: any): Promise<SupportTicket[]> {
    try {
      return await this.supportTicketRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }
  async remove(id: string): Promise<SupportTicket> {
    try {
      return await this.supportTicketRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }
  async create(
    createSupportTicketData: CreateSupportTicketDto,
  ): Promise<SupportTicket> {
    // const { authorId } = createSupportTicketData;

    try {
      // const existingSupportTicket = await this.supportTicketRepository.exists({
      //   where: { supportTicketId },
      // });

      // if (existingSupportTicket) {
      //   throw new HttpException(
      //     'SupportTicket with credentials already exists.',
      //     HttpStatus.CONFLICT,
      //   );
      // }

      // const supportTicketData = {
      //   ...createSupportTicketData,
      //   userId,
      //   planId,
      //   description,
      //   paymentMethod,
      //   status,
      //   amount,
      //   currency,
      //   startsAt,
      //   endsAt,
      //   cancelAt,
      //   cancelledAt,
      //   type,
      // };

      const newSupportTicket = await this.supportTicketRepository.create({
        data: createSupportTicketData,
      });
      Logger.debug(newSupportTicket);
      return newSupportTicket;
    } catch (error) {
      Logger.log(error);
      handleError(error);
    }
  }

  async update(id: string, updateSupportTicketData: UpdateSupportTicketDto) {
    try {
      return await this.supportTicketRepository.update({
        where: { id },
        data: updateSupportTicketData,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(id: string, updateSupportTicketData: UpdateSupportTicketDto) {
    Logger.debug(updateSupportTicketData);

    try {
      return await this.supportTicketRepository.upsert({
        where: { id },
        data: updateSupportTicketData,
      });
    } catch (error) {
      handleError(error);
    }
  }
}
