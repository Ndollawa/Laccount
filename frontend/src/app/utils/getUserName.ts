import userInterface from "@props/userProps"

 export const getUserFullName = (user:userInterface):string =>{
const {profile:{firstName,lastName}={}}= user;
return `${firstName} ${lastName}`;
 }