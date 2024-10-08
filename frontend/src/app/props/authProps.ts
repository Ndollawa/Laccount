import userInterface  from './userProps';

export interface authProps extends userInterface{
       token: string | null;
   }

export interface allowedRolesProps{
       allowedRoles:number[] | string[];
       
}