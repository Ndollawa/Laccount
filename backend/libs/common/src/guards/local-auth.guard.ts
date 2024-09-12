import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    // handleRequest(err:any, user:any, info:any, context:any) {
    //     if (err) {
    //       console.error('Auth Error:', err); // Debugging log for errors
    //       throw new UnauthorizedException();
    //     }
    //     if (!user) {
    //       console.log('No user found:', info); // Debugging log if user is not found
    //       throw new UnauthorizedException();
    //     }
    //     return user;
    //   }
}
