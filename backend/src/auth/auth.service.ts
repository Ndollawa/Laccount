import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
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
} from '@app/common';
import { RedisService } from '@app/common/redis';
import { UserService, RefreshTokenService } from '../user';
import { RefreshToken, User } from '@prisma/client';
import { LoginUserDto, RegisterUserDto } from './dto';
import { CreateRefreshTokenDto } from 'src/user/dto';
import {
  ResetPasswordDto,
  ResetPasswordRequestDto,
} from './dto/reset-password.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { VerifyUserEmailDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    protected readonly refreshTokenService: RefreshTokenService,
    protected readonly requestService: RequestService,
    protected readonly eventEmitter: EventEmitter2,
    @Inject(RedisService) protected readonly redisService: RedisService,
    private readonly jwtService: JwtService,
  ) {}

  validateUser = async ({ username, password }: LoginUserDto) => {
    const userType = EMAIL_REGEX.test(username);
    const userQuery = userType ? { email: username } : { username };
    const foundUser = await this.userService.find({ where: userQuery });
    console.log('first');
    this.logger.debug(foundUser);
    if (foundUser && (await compareHashData(password, foundUser?.password))) {
      const { password, ...user } = foundUser;
      return user;
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
    return await this.userService.create(registerUserDto);
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
