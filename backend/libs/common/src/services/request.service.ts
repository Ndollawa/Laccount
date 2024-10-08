import { Injectable, Scope } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  private user: User;
  constructor() {}

  public setUser(user: User) {
    this.user = user;
  }
  public getUser() {
    return this.user;
  }
}
