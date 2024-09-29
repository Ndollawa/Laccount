import { Module, forwardRef } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { AppsettingModule } from 'src/appsetting';
// import { UserModule } from 'src/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { UserService } from 'src/user/services/user.service';
import { UserRepository } from 'src/user/repositories/user.repository';
import { UserSeed } from 'src/user/seeds/user.seed';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development', '.env'],
      isGlobal: true,
      cache: true,
    }),
    AppsettingModule,
    // forwardRef(()=>UserModule),
  ],
  providers: [SeederService, UserService, UserRepository, UserSeed],
})
export class SeederModule {}
