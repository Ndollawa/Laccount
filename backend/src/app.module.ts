import { Module, Scope } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express/multer';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';

// import { ProjectModule } from './project';
// import { ServiceModule } from './service';
// import { CommentModule } from './comment';
// import { ReplyModule } from './reply';
// import { CategoryModule } from './category';
// import { SettingsModule } from './settings';
// import { PostModule } from './post';
import { join } from 'path';
import {
  LoggingInterceptor,
  ResponseInterceptor,
  
  HttpExceptionFilter,
} from '@app/common';
import { RequestService, RedisService } from '@app/common/services';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { PrismaModule } from '@app/prisma';
import { UserModule } from './user/user.module';
import { PaymentModule } from './payment/payment.module';
import { TransactionModule } from './transaction/transaction.module';
import { OrderModule } from './order/order.module';
import { RatingModule } from './rating/rating.module';
import { AuthModule } from './auth/auth.module';
import { UserRepository, UserService } from './user';
import { ListingModule } from './listing/listing.module';
import { AccountModule } from './account/account.module';
import { MailerModule } from './mailer/mailer.module';
import { AppsettingsModule } from './appsettings/appsettings.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development', '.env'],
      isGlobal: true,
      cache: true,
    }),
    ThrottlerModule.forRoot([{ ttl: 60, limit: 5 }]),
    MulterModule.register({
      dest: './uploads',
    }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    PostModule,
    CommentModule,
    PrismaModule,
    AuthModule,
    UserModule,
    PaymentModule,
    TransactionModule,
    OrderModule,
    RatingModule,
    ListingModule,
    AccountModule,
    MailerModule,
    AppsettingsModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [
    UserService,
    UserRepository,
    RequestService,
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
    
  ],
})
export class AppModule {}
