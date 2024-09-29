import { Injectable, Logger } from '@nestjs/common';
import { Testimonial, ActiveStatus } from '@prisma/client';
import { handleError } from '@app/common';
import { CreateTestimonialDto, UpdateTestimonialDto } from './dto';
import { TestimonialRepository } from './testimonial.repository';

@Injectable()
export class TestimonialService {
  constructor(
    protected readonly testimonialRepository: TestimonialRepository,
  ) {}

  async find(id: string): Promise<Testimonial> {
    try {
      return await this.testimonialRepository.find({
        where: { id },
        // include: { author: true },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(query: any): Promise<Testimonial[]> {
    try {
      return await this.testimonialRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }
  async remove(id: string): Promise<Testimonial> {
    try {
      return await this.testimonialRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }
  async create(
    createTestimonialData: CreateTestimonialDto,
  ): Promise<Testimonial> {
    // const { authorId } = createTestimonialData;

    try {
      // const existingTestimonial = await this.testimonialRepository.exists({
      //   where: { testimonialId },
      // });

      // if (existingTestimonial) {
      //   throw new HttpException(
      //     'Testimonial with credentials already exists.',
      //     HttpStatus.CONFLICT,
      //   );
      // }

      const testimonialData = {
        ...createTestimonialData,
        status: ActiveStatus.ACTIVE,
      };

      const newTestimonial = await this.testimonialRepository.create({
        data: testimonialData,
      });
      Logger.debug(newTestimonial);
      return newTestimonial;
    } catch (error) {
      Logger.log(error);
      handleError(error);
    }
  }

  async update(id: string, updateTestimonialData: UpdateTestimonialDto) {
    try {
      return await this.testimonialRepository.update({
        where: { id },
        data: updateTestimonialData,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(id: string, updateTestimonialData: UpdateTestimonialDto) {
    Logger.debug(updateTestimonialData);

    try {
      return await this.testimonialRepository.upsert({
        where: { id },
        data: updateTestimonialData,
      });
    } catch (error) {
      handleError(error);
    }
  }
}
