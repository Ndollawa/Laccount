import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import * as grpc from '@grpc/grpc-js';
import { Profile, ProfileStatus } from '@prisma/client';
import { handleError } from '@app/common';

import { ProfileRepository } from '../repositories/profile.repository';
import { CreateProfileDto, UpdateProfileDto } from '../dto';

const { ALREADY_EXISTS } = grpc.status;

@Injectable()
export class ProfileService {
  constructor(
    protected readonly profileRepository: ProfileRepository,
    protected readonly eventEmitter: EventEmitter2,
  ) {}

  async create(createProfileData: CreateProfileDto): Promise<Profile> {
    const { userId } = createProfileData;

    try {
      const existingProfile = await this.profileRepository.exists({
        where: { userId },
      });

      if (existingProfile) {
        throw new ConflictException({
          code: ALREADY_EXISTS,
          message: 'Profile with credentials already exists.',
        });
      }

      const profileData = {
        firstName: '',
        middleName: '',
        lastName: '',
        phone: '',
        dob: '',
        userId,
        gender: '',
        address: '',
        city: '',
        state: '',
        country: '',
        occupation: '',
        bio: '',
        for: '',
        image: '',
        status: ProfileStatus.ACTIVE,
        authentication2FA: false,
        user: {
          connect: { id: userId },
        },
      };

      const newProfile = await this.profileRepository.create({
        data: profileData,
      });

      this.eventEmitter.emit('profile-created', newProfile);
      Logger.debug(newProfile);
      return newProfile;
    } catch (error) {
      Logger.log(error);
      handleError(error);
    }
  }

  async update(id: string, updateProfileData: UpdateProfileDto) {
    Logger.debug(updateProfileData);

    try {
      return await this.profileRepository.update({
        where: { id },
        data: updateProfileData,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(id: string, updateProfileData: UpdateProfileDto) {
    Logger.debug(updateProfileData);

    try {
      return await this.profileRepository.upsert({
        where: { id },
        data: updateProfileData,
      });
    } catch (error) {
      handleError(error);
    }
  }
}
