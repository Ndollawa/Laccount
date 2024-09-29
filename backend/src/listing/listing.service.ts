import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Listing, ListingStatus } from '@prisma/client';
import { handleError } from '@app/common';
import { ListingRepository } from './listing.repository';
import { CreateListingDto, UpdateListingDto } from './dto';

@Injectable()
export class ListingService {
  constructor(
    protected readonly listingRepository: ListingRepository,
    protected readonly eventEmitter: EventEmitter2,
  ) {}

  async find(query: any): Promise<Listing> {
    try {
      return await this.listingRepository.find({
        where: query,
        include: { seller: true },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(query: any): Promise<Listing[]> {
    try {
      return await this.listingRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }

  async create(createListingData: CreateListingDto): Promise<Listing> {
    try {
      const newListing = await this.listingRepository.create({
        data: createListingData,
      });

      this.eventEmitter.emit('Listing-created', newListing);
      return newListing;
    } catch (error) {
      Logger.log(error);
      handleError(error);
    }
  }

  async update(id: string, data: UpdateListingDto) {
    Logger.debug(data);
    try {
      return await this.listingRepository.update({
        where: { id },
        data: data,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(id: string, data: UpdateListingDto) {
    Logger.debug(data);
    try {
      return await this.listingRepository.upsert({
        where: { id },
        data: data,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: string): Promise<Listing> {
    try {
      return await this.listingRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }

  // @OnEvent('Listing-created')
  // sendVerificationEmail(payload: Listing) {
  //   console.log(payload);
  //   return this.mailClient.emit('sendMail', payload);
  // }
}
