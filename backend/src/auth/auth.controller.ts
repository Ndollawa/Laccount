import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  Res,
  ValidationPipe,
  UnauthorizedException,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import {
  RegisterUserDto,
  LoginUserDto,
  ResetPasswordDto,
  ResetPasswordRequestDto,
  VerifyUserEmailDto,
} from './dto';
import {
  LocalAuthGuard,
  RefreshJwtAuthGuard,
  splitRt,
  Tokens,
} from '@app/common';
import { RequestService } from '@app/common/services';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly requestService: RequestService,
  ) {}

  @Post('/register')
  async registerUser(@Body(ValidationPipe) registerUserDto: RegisterUserDto) {
    return await this.authService.register(registerUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async loginUser(
    @Req() req: Request,
    @Res() res: Response,
    // @Body(ValidationPipe) loginUserDto: LoginUserDto,
  ): Promise<any> {
    const foundUser = (req as any).user;
    if (!foundUser) throw new UnauthorizedException();
    const { cookies } = req;
    if (cookies?.jwt) {
      const { refreshTokenId, refreshToken } = splitRt(cookies.jwt);
      await this.authService.findRefreshToken(refreshTokenId);
      await this.authService.removeRefreshToken(refreshTokenId);

      res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
    }
    // const foundUser = await this.authService.validateUser(loginUserDto);
    const { accessToken, refreshToken }: Tokens =
      await this.authService.login(foundUser);
    // console.log(foundUser);
    if (accessToken) {
      // this.requestService.setUser(foundUser);

      // Create secure cookie with refresh token
      res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server
        secure: true, //https
        sameSite: 'none', //cross-site cookie
        maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
      });
    }
    return res.json({ accessToken });
  }

  @Post('/logout')
  async logoutUser(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<boolean> {
    const cookies = req.cookies;
    if (!cookies?.jwt)
      throw new UnauthorizedException({ message: 'Unauthorized User' });
    const refreshToken = cookies.jwt;
    //on logout delete access token
    const foundUser = await this.authService.findRefreshToken(refreshToken);
    if (!foundUser) {
      res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
      throw new UnauthorizedException(); // unauthorized
    }
    // //delete refresh token from DB

    await this.authService.removeRefreshToken(refreshToken);
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    throw new UnauthorizedException({ message: 'Unauthorized User' }); // unauthorized
    return true;
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Get('/refresh')
  async refreshToken(@Req() req: Request, @Res() res: Response): Promise<any> {
    const cookies = req.cookies;
    if (!cookies?.jwt) throw new UnauthorizedException({ message: 'no token' });
    const { refreshTokenId, refreshToken } = splitRt(cookies.jwt);
    //check for user  in the DB
    // break;
    // const foundUser = await this.authService.findRefreshToken(refreshTokenId);
    const foundUser = (req as any).user;
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    if (!foundUser) {
      const hackedUser = await this.authService.verifyToken({ refreshToken });
      if (hackedUser) {
        await this.authService.removeManyRefreshToken({
          where: { userId: hackedUser.id },
        });
      }
      throw new UnauthorizedException('Unauthorized user');
    }
    // Detect refresh token reuse! (Hacked token)
    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.refreshUserToken(foundUser?.user);
    res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  }

  @Post('reset-password-request')
  async resetPasswordRequest(
    @Body() resetPasswordRequestDto: ResetPasswordRequestDto,
  ): Promise<any> {
    return this.authService.resetPasswordRequest(resetPasswordRequestDto);
  }

  @Get('verify-user-email')
  async verifyUserEmail(
    @Body() verifyUserEmailDto: VerifyUserEmailDto,
  ): Promise<any> {
    return this.authService.verifyUserEmail(verifyUserEmailDto);
  }

  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<any> {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
