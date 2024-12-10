import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { User } from '@prisma/client';

@Injectable()
export class AuthEventsService {
  constructor(protected readonly eventEmitter: EventEmitter2) {}

  @OnEvent('user-created')
  sendWelcomeEmail(payload: User) {
    console.log(payload);
    // return this.mailClient.emit('sendMail', payload);
  }

  @OnEvent('user-created')
  sendVerificationEmail(payload: User) {
    console.log(payload);
    // return this.mailClient.emit('sendMail', payload);
  }

  @OnEvent('reset-password-requested')
  sendResetPasswordEmail(payload: User) {
    console.log(payload);
    // return this.mailClient.emit('sendMail', payload);
  }

  //   @OnEvent('user-created')
  //   sendVerificationEmail(payload: User) {
  //     console.log(payload);
  //     // return this.mailClient.emit('sendMail', payload);
  //   }
}
