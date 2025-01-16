import { SetMetadata } from '@nestjs/common';
import USER_ROLES from '../config/roleList';
export const AllowedRoles = (...roles: [string] | string[]) =>
  SetMetadata('roles', roles);
