import { forwardRef, Module, Scope } from '@nestjs/common';
import {
  CacheModule,
  Cache,
  CACHE_MANAGER,
  CacheInterceptor,
} from '@nestjs/cache-manager';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express/multer';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  LoggingInterceptor,
  ResponseInterceptor,
  HttpExceptionFilter,
  RequestService,
  RedisModule,
} from '@app/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import redisStore from 'cache-manager-redis-store';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { PrismaModule } from '@app/prisma';
import { UserModule } from './user/user.module';
import { PaymentModule } from './payment';
import { TransactionModule } from './transaction';
import { OrderModule } from './order/';
import { RatingModule } from './rating/';
import { AuthModule } from './auth/';
import { ListingModule } from './listing/';
import { AccountDetailsModule } from './accountDetails/';
import { MailerModule } from './mailer/mailer.module';
import { AppsettingModule } from './appsetting';
import { NotificationModule } from './notification/';
import { MessageModule } from './message';
import { RoomModule } from './room';
import { ServiceModule } from './services';
import { SubscriptionModule } from './subscription';
import { SupportTicketModule } from './support';
import { TestimonialModule } from './testimonial';
import { CategoryModule } from './category';
import { SubscriptionPlanModule } from './subscriptionPlan';
import { SeederModule } from '@app/common/seeder/seeder.module';

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
    // CacheModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     store: redisStore as any,
    //     host: configService.get<string>('REDIS_HOST', 'localhost'),
    //     port: configService.get<number>('REDIS_PORT', 6379),
    //     ttl: configService.get<number>('CACHE_TTL', 600),
    //   }),
    // }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST', 'localhost'),
          port: configService.get<number>('REDIS_PORT', 6379),
        },
      }),
    }),
    PrismaModule,
    RedisModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    MailerModule,
    NotificationModule,
    PostModule,
    AppsettingModule,
    CommentModule,
    ListingModule,
    AccountDetailsModule,
    SubscriptionModule,
    SupportTicketModule,
    CategoryModule,
    PaymentModule,
    TransactionModule,
    OrderModule,
    RatingModule,
    MessageModule,
    RoomModule,
    ServiceModule,
    SubscriptionPlanModule,
    TestimonialModule,
    forwardRef(() => SeederModule),
  ],
  controllers: [],
  providers: [
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
    // {
    //   provide: APP_INTERCEPTOR,
    //   // scope: Scope.REQUEST,
    //   useClass: CacheInterceptor,
    // },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
