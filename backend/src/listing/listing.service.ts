import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import * as grpc from '@grpc/grpc-js';
import { Listing,ListingStatus} from '@prisma/client';
import { handleError } from '@app/common';
import { ListingRepository } from './listing.repository';
import { CreateListingDto, UpdateListingDto } from './dto';

const { ALREADY_EXISTS, UNAUTHENTICATED } = grpc.status;

@Injectable()
export class ListingService {
  constructor(
    protected readonly ListingRepository: ListingRepository,
    protected readonly eventEmitter: EventEmitter2,
  ) {}

  async findListing(query: any): Promise<Listing> {
    try {
      return await this.ListingRepository.find({
        where: query,
        include: { seller: true},
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findAllListings(query: any): Promise<Listing[]> {
    try {
      return await this.ListingRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }

  async createListing(createListingData: CreateListingDto): Promise<Listing> {
    try {
        const newListing = await this.ListingRepository.create({
        data:createListingData,
      });

      this.eventEmitter.emit('Listing-created', newListing);
      return newListing;
    } catch (error) {
      Logger.log(error);
      handleError(error);
    }
  }

  async updateListing(id: string, data: UpdateListingDto) {
    Logger.debug(data);
    try {
      return await this.ListingRepository.update({
        where: { id },
        data: data,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsertListing(id: string, data: UpdateListingDto) {
    Logger.debug(data);
    try {
      return await this.ListingRepository.upsert({
        where: { id },
        data: data,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async removeListing(id: string): Promise<Listing> {
    try {
      return await this.ListingRepository.delete({
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
