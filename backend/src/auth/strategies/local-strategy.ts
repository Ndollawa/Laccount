import {
  Injectable,
  UnauthorizedException,
  Logger,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { splitRt, Tokens, handleError } from '@app/common';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
  ) {
    super({
      usernameField: 'user',
      passwordField: 'password',
      passReqToCallback: true, // Allows us to access the request object
    });
  }

  validate = async (req: Request, user: string, password: string) => {
    try {
      const foundUser = await this.authService.validateUser({
        user,
        password,
      });

      if (!foundUser) {
        throw new UnauthorizedException('Invalid credentials.');
      }

      // Clear existing refresh token if it exists in cookies
      const cookies = req.cookies;
      if (cookies?.jwt) {
        const { refreshTokenId } = splitRt(cookies.jwt);
        await this.authService.findRefreshToken(refreshTokenId);
        await this.authService.removeRefreshToken(refreshTokenId);

        // Clear the existing JWT cookie
        req.res.clearCookie('jwt', {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        });
      }

      // Generate new tokens
      const { accessToken, refreshToken } =
        await this.authService.login(foundUser);

      // Set the new refresh token in the cookies
      req.res.cookie('jwt', refreshToken, {
        httpOnly: true, // accessible only by the web server
        secure: true, // ensures HTTPS is used
        sameSite: 'none', // allows cross-site cookie usage
        maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiry: 7 days
      });

      // Return the found user and the new access token to be used in the controller
      return { user: foundUser, accessToken };
    } catch (error) {
      this.logger.error(error);
      handleError(error);
    }
  };
}
