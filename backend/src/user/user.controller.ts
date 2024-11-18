import {
  Body,
  ConflictException,
  Controller,
  Delete,
  forwardRef,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EMAIL_REGEX, handleError, hashData } from '@app/common';
import * as grpc from '@grpc/grpc-js';
import { User, WalletType, WalletStatus } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserRolesEnum, UserRolesKeysEnum } from './enums/user-roles';
import { UserService } from './services/user.service';
const { ALREADY_EXISTS, UNAUTHENTICATED } = grpc.status;

@Controller('users')
export class UserController {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const { firstName, lastName, username, email, password, confirmPassword } =
      createUserDto;

    if (password !== confirmPassword) {
      throw new UnauthorizedException({
        code: UNAUTHENTICATED,
        message: 'Password mismatch',
      });
    }

    const hashedPassword = await hashData(password, 10);
    try {
      const existingUser = await this.userService.exists({
        where: { OR: [{ email }, { username }] },
      });

      if (existingUser) {
        throw new ConflictException({
          code: ALREADY_EXISTS,
          message: 'User with credentials already exists.',
        });
      }

      const userData = {
        username,
        email,
        password: hashedPassword,
        verificationStatus: false,
        roles: {
          create: {
            role: UserRolesKeysEnum.USER,
            code: UserRolesEnum.USER,
          },
        },
        profile: {
          create: {
            firstName,
            lastName,
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

      return await this.userService.create(userData);
    } catch (error) {
      handleError(error);
    }
  }

  @Get()
  async findAll(): Promise<User[]> {
    try {
      const users = await this.userService.findAll({
        where: {
          roles: {
            some: {
              role: {
                notIn: [UserRolesKeysEnum.DEV], //, UserRolesKeysEnum.ADMIN Assuming you want to exclude both DEV and ADMIN
              },
            },
          },
        },
        select: {
          id: true,
          username: true,
          email: true,
          verificationStatus: true,
          createdAt: true,
          profile: true,
          roles: true,
          //   refreshTokens: true,
          wallets: true,
        },
      });

      return users;
    } catch (error) {
      handleError(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const query = {
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        verificationStatus: true,
        profile: true,
        roles: true,
        refreshTokens: true,
        wallets: true,
      },
    };
    return await this.userService.find(query);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return await this.userService.remove(id);
  }

  @Post('check-duplicate')
  async checkDuplicate(@Body() { user }: { user: string }): Promise<boolean> {
    const userType = EMAIL_REGEX.test(user);
    const userQuery = userType ? { email: user } : { username: user };
    return await this.userService.exists({
      where: userQuery,
    });
  }
  // queryUsers(paginationDtoStream: PaginationDto):Promise<any> | Observable<any> {
  //   // return this.userService.queryUser(paginationDtoStream);
  //   return null
  // }

  @OnEvent('user-created')
  sendVerificationEmail(payload: User) {
    console.log(payload, 'from controller');
  }
}
