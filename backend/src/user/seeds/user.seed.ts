import { WalletType } from '@prisma/client';
import { UserService } from './../services/user.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { WalletStatus } from '@prisma/client';
import { UserRolesEnum, UserRolesKeysEnum } from '../enums/user-roles';
import { handleError, hashData } from '@app/common';

const adminUser = {
  email: 'admin@admin.com',
  username: 'admin',
  verificationStatus: true,
  // Multiple roles using `createMany`
  roles: {
    createMany: {
      data: [
        {
          role: UserRolesKeysEnum.USER,
          code: UserRolesEnum.USER,
        },
        {
          role: UserRolesKeysEnum.ADMIN,
          code: UserRolesEnum.ADMIN,
        },
      ],
    },
  },

  profile: {
    create: {
      firstName: 'Admin',
      lastName: 'O',
    },
  },

  wallets: {
    create: {
      balance: 0,
      type: WalletType.FIAT,
      status: WalletStatus.ACTIVE,
      currency: {
        name: 'FIAT',
      },
    },
  },
};
const devUser = {
  email: 'dev@admin.com',
  username: 'developer',
  verificationStatus: true,

  // Multiple roles using `createMany`
  roles: {
    createMany: {
      data: [
        {
          role: UserRolesKeysEnum.DEV,
          code: UserRolesEnum.DEV,
        },
        {
          role: UserRolesKeysEnum.ADMIN,
          code: UserRolesEnum.ADMIN,
        },
      ],
    },
  },

  profile: {
    create: {
      firstName: 'Software',
      lastName: 'Developer',
    },
  },

  wallets: {
    create: {
      balance: 0,
      type: WalletType.FIAT,
      status: WalletStatus.ACTIVE,
      currency: {
        name: 'FIAT',
      },
    },
  },
};

@Injectable()
export class UserSeed {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async seedUser() {
    const adminHashedPassword = await hashData('admin@123', 10);
    const devHashedPassword = await hashData('dev@123', 10);
    if (
      !(await this.userService.exists({
        where: {
          roles: {
            // This line is different
            // Find any user where at least one of their roles abides by this condition.
            // Replace with "every" to only search for users where ALL of their roles abide by this condition,
            // or "none" to only search for users where NONE of their roles abide by this condition.
            some: {
              AND: [
                {
                  code: UserRolesEnum.ADMIN,
                },
                {
                  role: UserRolesKeysEnum.ADMIN,
                },
              ],
            },
          },
        },
      }))
    ) {
      try {
        return await this.userService.create({
          password: adminHashedPassword,
          ...adminUser,
        });
      } catch (error) {
        handleError(error);
      }
    }
    if (
      !(await this.userService.exists({
        where: {
          roles: {
            some: {
              AND: [
                {
                  code: UserRolesEnum.DEV,
                },
                {
                  role: UserRolesKeysEnum.DEV,
                },
              ],
            },
          },
        },
      }))
    ) {
      try {
        return await this.userService.create({
          password: devHashedPassword,
          ...devUser,
        });
      } catch (error) {
        handleError(error);
      }
    }
  }
}
