import { useState,useEffect, useRef } from "react";
import { useGetContactsQuery } from "@dashboard/pages/Contact/slices/contactsApi.slice";
import { selectCurrentUser } from "@auth/slices/auth.slice";
import { useSelector } from "react-redux";


interface UserContact{
    id:string;
    user:string;
    contacts:string[];
}
const useUserContacts = ()=>{
    const currentUser = useSelector(selectCurrentUser)
    const userContact = useRef<any>({})
    const {
        data:allContacts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetContactsQuery('contactList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
       if(isSuccess && !isLoading){
            const {entities} = allContacts
userContact.current =(Object.values(entities).filter((contact:any)=> contact.user === currentUser?.id))
       }
   

    const isContact = (userId:string) =>{
     let r = false
        if(userContact.current.length >0){
             r = userContact.current[0]?.contacts?.includes(userId) 
         
        }  return  r 
    }
 return [isContact]
}


export default useUserContacts