import userInterface  from './userProps';

export interface AuthProps extends userInterface{
       token: string | null;
   }

export interface AllowedRolesProps{
       allowedRoles:number[] | string[];
       
}