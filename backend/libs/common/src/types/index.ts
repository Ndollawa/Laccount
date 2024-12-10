import { ISendMailOptions } from '@nestjs-modules/mailer';

export type SendEMailDto = {
  data: ISendMailOptions;
  mailOption: { type: 'Plain' | 'Html' | 'Attachment' };
};

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface AccessToken {
  accessToken: string;
}

export interface RefeshTokenResult {
  refeshToken: string;
}

export interface RefreshTokenQueryDto {
  id?: string | undefined;
  refreshToken?: string | undefined;
  userId?: string | undefined;
}
