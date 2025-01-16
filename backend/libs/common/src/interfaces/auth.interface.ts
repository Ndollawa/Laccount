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
