export interface User{
   id:string | undefined;
   email:string | undefined;
   username:string | undefined;
   verificationStatus:number | boolean | undefined;
   
   createdAt?:Date;
   updatedAt?:Date;
}

export interface Profile{
   id : string | undefined;
   firstName: string | undefined;
   lastName: string | undefined;
   middleName?: string | undefined;
   phone: string | undefined;
   dob: string | undefined;
   gender: string | undefined;
   address: string | undefined;
   city: string | undefined;
   state: string | undefined;
   country: string | undefined;
   occupation: string | undefined;
   bio: string | undefined;
   authentication_2FA : boolean | string | null |undefined;
   image : string | undefined;
   status : string | undefined;
   userId? : string | undefined;
   createdAt?:Date;
   updatedAt?:Date;
}
export interface Role{
   code : string | undefined;
   id : string | undefined;
   role : string | undefined;
   userId : string | undefined;
   
   createdAt?:Date;
   updatedAt?:Date;
}
export interface Wallet{
   id: string | undefined;
   userId: string | undefined;
   type: string | undefined;
   balance: number | string | undefined;
   currency: object;
   createdAt?:Date;
   updatedAt?:Date;
}



 interface userInterface extends User{
     profile:Profile | undefined;
     online?:{
        status:boolean | undefined;
        lastSeen:Date | undefined;
     }
     roles:  Role[] | [];
     wallets: Wallet[] | [];
    }
 export default userInterface