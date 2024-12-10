import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { handleError } from '@app/common';
import { Rating } from '@prisma/client';
import { RatingRepository } from './rating.repository';

@Injectable()
export class RatingService {
  constructor(protected readonly ratingRepository: RatingRepository) {}

  async find(id: any): Promise<Rating> {
    try {
      return await this.ratingRepository.find({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(query: any): Promise<Rating[]> {
    try {
      return await this.ratingRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }
  async remove(id: string): Promise<Rating> {
    try {
      return await this.ratingRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }
  async create(createRatingData: CreateRatingDto): Promise<Rating> {
    const { userId, orderId } = createRatingData;

    try {
      const existingRating = await this.ratingRepository.exists({
        where: { OR: [{ userId }, { orderId }] },
      });

      if (existingRating) {
        throw new HttpException(
          'Rating with credentials already exists.',
          HttpStatus.CONFLICT,
        );
      }

      const RatingData = {
        ...createRatingData,
      };

      const newRating = await this.ratingRepository.create({
        data: RatingData,
      });
      Logger.debug(newRating);
      return newRating;
    } catch (error) {
      Logger.log(error);
      handleError(error);
    }
  }

  async update(id: string, updateRatingData: UpdateRatingDto) {
    try {
      return await this.ratingRepository.update({
        where: { id },
        data: updateRatingData,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(id: string, updateRatingData: UpdateRatingDto) {
    try {
      return await this.ratingRepository.upsert({
        where: { id },
        data: updateRatingData,
      });
    } catch (error) {
      handleError(error);
    }
  }
}
