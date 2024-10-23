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

    const { accessToken } = (req as any).user; // accessToken is already set in the strategy
    res.json({ accessToken });
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

    const { accessToken } = (req as any).user; // accessToken is already set in the strategy
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
