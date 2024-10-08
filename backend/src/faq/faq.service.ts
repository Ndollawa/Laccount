import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { handleError } from '@app/common';
import { Faq } from '@prisma/client';
import { FaqRepository } from './faq.repository';

@Injectable()
export class FaqService {
  constructor(protected readonly faqRepository: FaqRepository) {}

  async find(id: any): Promise<Faq> {
    try {
      return await this.faqRepository.find({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(query: any): Promise<Faq[]> {
    try {
      return await this.faqRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }
  async remove(id: string): Promise<Faq> {
    try {
      return await this.faqRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }
  async create(createFaqData: CreateFaqDto): Promise<Faq> {
    const { question } = createFaqData;

    try {
      const existingFaq = await this.faqRepository.exists({
        where: { question },
      });

      if (existingFaq) {
        throw new HttpException(
          'Faq with credentials already exists.',
          HttpStatus.CONFLICT,
        );
      }

      const FaqData = {
        ...createFaqData,
      };

      const newFaq = await this.faqRepository.create({
        data: FaqData,
      });
      Logger.debug(newFaq);
      return newFaq;
    } catch (error) {
      Logger.log(error);
      handleError(error);
    }
  }

  async update(id: string, updateFaqData: UpdateFaqDto) {
    try {
      return await this.faqRepository.update({
        where: { id },
        data: updateFaqData,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(id: string, updateFaqData: UpdateFaqDto) {
    try {
      return await this.faqRepository.upsert({
        where: { id },
        data: updateFaqData,
      });
    } catch (error) {
      handleError(error);
    }
  }
}
