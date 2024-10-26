import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import shortid from 'shortid';
import {
  EMAIL_REGEX,
  compareHashData,
  Tokens,
  RefreshTokenQueryDto,
  hashData,
  RequestService,
  handleError,
} from '@app/common';

import * as grpc from '@grpc/grpc-js';
const { ALREADY_EXISTS, UNAUTHENTICATED } = grpc.status;
import { RedisService } from '@app/common/redis';
import { UserService, RefreshTokenService } from '../user';
import { RefreshToken, User, WalletType } from '@prisma/client';
import { LoginUserDto, RegisterUserDto } from './dto';
import { CreateRefreshTokenDto } from 'src/user/dto';
import {
  ResetPasswordDto,
  ResetPasswordRequestDto,
} from './dto/reset-password.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { VerifyUserEmailDto } from './dto/auth.dto';
import { UserRolesEnum, UserRolesKeysEnum } from 'src/user/enums/user-roles';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    protected readonly refreshTokenService: RefreshTokenService,
    protected readonly requestService: RequestService,
    protected readonly eventEmitter: EventEmitter2,
    @Inject(forwardRef(() => RedisService))
    protected readonly redisService: RedisService,
    private readonly jwtService: JwtService,
  ) {}

  validateUser = async ({ user, password }: LoginUserDto) => {
    const userType = EMAIL_REGEX.test(user);
    const userQuery = userType ? { email: user } : { username: user };
    const foundUser = await this.userService.findFirst({
      where: userQuery,
      include: {
        profile: true,
        roles: true,
        // refreshTokens: true,
        wallets: true,
      },
    });
    if (foundUser && (await compareHashData(password, foundUser?.password))) {
      const { password, ...userInfo } = foundUser;
      return userInfo;
    }
    return null;
  };

  verifyToken = async (refreshTokenQueryDto: RefreshTokenQueryDto) => {
    const { refreshToken } = refreshTokenQueryDto;
    return await this.jwtService.verifyAsync(refreshToken);
  };

  login = async (user: Omit<User, 'password'>): Promise<Tokens> => {
    const { accessToken, refreshToken } = await this._generateTokens(user);
    return { accessToken, refreshToken };
  };

  register = async (registerUserDto: RegisterUserDto) => {
    const { firstName, lastName, username, email, password, confirmPassword } =
      registerUserDto;

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
          createMany: {
            data: [
              {
                balance: 0,
                type: WalletType.CREDIT,
                currency: {
                  name: 'LA',
                },
              },
              {
                balance: 0,
                type: WalletType.FIAT,
                currency: {
                  name: 'FA',
                },
              },
            ],
          },
        },
      };
      return await this.userService.create(userData);
    } catch (error) {
      handleError(error);
    }
  };

  saveUserRefreshToken = async (
    createRefreshTokenData: CreateRefreshTokenDto,
  ) => {
    return await this.refreshTokenService.create(createRefreshTokenData);
  };

  refreshUserToken = async (user: User): Promise<Tokens> => {
    const { accessToken, refreshToken } = await this._generateTokens(user);
    return { accessToken, refreshToken };
  };

  logout = async (user: User) => {};

  findRefreshToken = async (id: string): Promise<RefreshToken | any> => {
    return await this.refreshTokenService.find(id);
  };

  removeRefreshToken = async (id: string): Promise<RefreshToken> => {
    return await this.refreshTokenService.remove(id);
  };

  removeManyRefreshToken = async (query: any): Promise<RefreshToken[]> => {
    return await this.refreshTokenService.removeMany(query);
  };

  resetPassword = async ({
    email,
    otp,
    token,
    confirmPassword,
    newPassword,
  }: ResetPasswordDto): Promise<any> => {
    const storedOtp = await this.redisService.get('otp', email);
    const storedToken = await this.redisService.get('token', email);

    if (storedOtp === otp && storedToken === token) {
      // Update password in the database
      const hashedPassword = await hashData(newPassword, 10);
      await this.userService.update(this.requestService.getUser().id, {
        password: hashedPassword,
      });
      // Delete OTP and token from Redis
      await this.redisService.delete('otp', email);
      await this.redisService.delete('token', email);
      return { message: 'Password reset successful' };
    }
  };

  verifyUserEmail = async ({
    email,
    otp,
    token,
  }: VerifyUserEmailDto): Promise<any> => {
    const storedOtp = await this.redisService.get('otp', email);
    const storedToken = await this.redisService.get('token', email);

    if (storedOtp === otp && storedToken === token) {
      // Update password in the database
      await this.userService.update(this.requestService.getUser().id, {
        verificationStatus: true,
      });
      // Delete OTP and token from Redis
      await this.redisService.delete('otp', email);
      await this.redisService.delete('token', email);
      return { message: 'Password reset successful' };
    }
  };
  resetPasswordRequest = async ({
    email,
  }: ResetPasswordRequestDto): Promise<any> => {
    const foundUser = this.userService.find({ where: { email } });
    if (!foundUser)
      throw new NotFoundException(`User with email ${email} not found.`);
    const tokens = await this._generateTokens(foundUser);
    const otp = shortid.generate();
    const token = 'random-token'; // Generate a secure token
    const ttl = 3600; // 1 hour TTL

    // Store OTP and token in Redis
    await this.redisService.setWithExpiry('otp', email, otp, ttl);
    await this.redisService.setWithExpiry('token', email, token, ttl);
    this.eventEmitter.emit('reset-password-requested', {
      otp,
      token,
      foundUser,
    });
    return { message: 'password request sent.' };
  };

  protected async _generateTokens(user: User & any): Promise<Tokens> {
    const roles = Object.values(user?.roles || {}).filter(Boolean);
    const payload = {
      user: user.email,
      sub: {
        ...user,
        roles,
      },
    };
    const accessToken = this.jwtService.sign(payload);
    const newRefreshToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
      secret: this.configService.getOrThrow('REFRESH_TOKEN_SECRET'),
    });
    const rt = await this.refreshTokenService.create({
      userId: user?.id,
      refreshToken: newRefreshToken,
    });
    return { accessToken, refreshToken: rt.id + ' ' + newRefreshToken };
  }
}
