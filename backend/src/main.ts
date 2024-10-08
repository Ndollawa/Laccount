import { NestFactory } from '@nestjs/core';
import csurf from 'csurf';
import {
  ValidationPipe,
  ValidationError,
  BadRequestException,
  // UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { CredentialsMiddleware, ErrorHandler } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          validationErrors.map((error) => ({
            field: error.property,
            // error: Object.values(error.constraints).join(', '),
            error: Object.values(error.constraints),
          })),
        );
      },
    }),
  );
  app.use(express.urlencoded({ extended: true, limit: '200mb' }));
  app.use(express.json({ limit: '200mb' }));
  app.use(CredentialsMiddleware);
  app.use(passport.initialize());
  app.use(cookieParser());
  //app.use(csurf());
  const devPort = app.get(ConfigService).get('DEVELOPMENT_PORT');
  const port = process.env.PORT || devPort;
  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
  });
  app.setGlobalPrefix('api/v1');
  app.use(ErrorHandler);
  app.enableVersioning();
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  await app.listen(port);
}
bootstrap();
