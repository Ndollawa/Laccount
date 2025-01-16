import { ISendMailOptions } from '@nestjs-modules/mailer';
import { User } from '@prisma/client';

export type SendEMailDto = {
  data: ISendMailOptions;
  mailOption: { type: 'Plain' | 'Html' | 'Attachment' };
};

export type AuthenticatedUser = User;
