import { Injectable, UnauthorizedException, Req } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service'; // Make sure to import your AuthService
import { splitRt } from '@app/common';
import { Request } from 'express';

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
  private static extractJWTFromCookie(@Req() req: Request): string | null {
    if (req.cookies && req.cookies.jwt) {
      const { refreshToken } = splitRt(req.cookies.jwt);
      return refreshToken;
    }
    return null;
  }

  validate = async (payload: any) => {
    return { user: payload.sub };
  };
}
