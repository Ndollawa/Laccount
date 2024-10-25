import { Injectable, UnauthorizedException, Req } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service'; // Make sure to import your AuthService
import { splitRt, Tokens } from '@app/common';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtRefreshStrategy.extractJWTFromCookie,
      ]),
      ignoreExpiration: false,
      secretOrKey:
        configService.getOrThrow('REFRESH_TOKEN_SECRET') ||
        process.env.REFRESH_TOKEN_SECRET,
    });
  }

  // Custom method to extract JWT from cookies
  private static extractJWTFromCookie(@Req() req: any): string | null {
    if (req.cookies && req.cookies.jwt) {
      const { refreshTokenId, refreshToken } = splitRt(req.cookies.jwt);
         return refreshToken;
    }
    return null;
  }

  // Overriding Passport validate method to include the full refresh token flow
  async validate(payload: any, @Req() req: any): Promise<any> {
    const cookies = req?.cookies;
    console.log('hi');
    if (!cookies?.jwt) {
      throw new UnauthorizedException('No refresh token provided');
    }

    const { refreshTokenId, refreshToken } = splitRt(cookies.jwt); // Assuming splitRt extracts token ID and actual token
    const foundUser = await this.authService.findRefreshToken(refreshTokenId);

    // Clear cookie regardless of the outcome
    req.res.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    if (!foundUser) {
      // Token reuse detection (hacked token case)
      const hackedUser = await this.authService.verifyToken({ refreshToken }); // Assuming verifyToken takes refreshToken and verifies it
      if (hackedUser) {
        // If the token is reused, remove all refresh tokens for the hacked user
        await this.authService.removeManyRefreshToken({
          where: { userId: hackedUser.id },
        });
      }
      throw new UnauthorizedException('Unauthorized or token reuse detected');
    }

    // If token is valid, proceed to issue new tokens
    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.refreshUserToken(foundUser.user);

    // Attach new refresh token as cookie
    req.res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiry
    });

    // Return the user and new access token, can be passed to the controller
    return { user: foundUser.user, accessToken };
  }
}
