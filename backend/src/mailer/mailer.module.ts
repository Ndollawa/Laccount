import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailTemplateService, EMailTemplateService } from './services';
import {
  MailTemplateRepository,
  EMailTemplateRepository,
} from './repositories';
import { MailerController } from './mailer.controller';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [
    NestMailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          // sendmail: configService.get<boolean>('MAIL_TRANSPORT', true),
          // newline: configService.get<string>('MAIL_NEWLINE', 'unix'),
          // path: configService.get<string>('MAIL_PATH', '/usr/sbin/sendmail'),

          // Uncomment and use these settings if you want to configure SMTP
          ignoreTLS: true,
          secure: false,
          host: configService.get<string>('SMTP_HOST'),
          port: configService.get<string>('SMTP_PORT'),
          auth: {
            user: configService.get<string>('SMTP_USER'),
            pass: configService.get<string>('SMTP_PASSWORD'),
          },
        },
        defaults: {
          from: '"No Reply" <no-reply@example.com>', // default sender email
        },
        template: {
          path: join(__dirname, 'templates'),
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          //   {
          //   viewEngine: {
          //     partialsDir: join(__dirname, './templates'),
          //     layoutsDir: join(__dirname, './templates'),
          //     defaultLayout: false, // not using layouts in this example
          //   },
          //   extName: '.hbs',
          // } // or any other adapter
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
  ],
  controllers: [MailerController],
  providers: [
    MailTemplateService,
    EMailTemplateService,
    MailTemplateRepository,
    EMailTemplateRepository,
  ],
  exports: [MailTemplateService, EMailTemplateService],
})
export class MailerModule {}
