import {
  Injectable,
  UnauthorizedException,
  Logger,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
// import { LoginUserDto } from '../dto';
import { AuthService } from '../auth.service';
import { handleError } from '@app/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  private readonly logger = new Logger(LocalStrategy.name);
  constructor(
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
  ) {
    super({
      usernameField: 'user',
      passwordField: 'password',
    });
  }

  validate = async (user: string, password: string) => {
    try {
      const foundUser = await this.authService.validateUser({
        user,
        password,
      });
      // this.logger.debug(foundUser);
      if (!foundUser) {
        throw new UnauthorizedException('Invalid credentials.');
      }
      return foundUser;
    } catch (error) {
      handleError(error);
    }
  };
}
