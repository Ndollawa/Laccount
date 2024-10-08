import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  handleRequest(err: any, user: any, info: any, context: any) {
    if (err) {
      console.error('Auth Error:', err); // Debugging log for errors
      throw new UnauthorizedException();
    }
    if (!user) {
      console.log('No user found, reason:', info.message); // This shows more useful info
      throw new UnauthorizedException(info?.message || 'Unauthorized');
    }

    return user;
  }
}
