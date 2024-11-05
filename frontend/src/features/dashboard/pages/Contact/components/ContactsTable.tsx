import React,{useEffect,useState} from 'react'
import {useGetContactsQuery } from '../slices/contactsApi.slice'
import { Link } from 'react-router-dom'
import { FaEye } from 'react-icons/fa'
import ContactTableData from './ContactTableData'
import contactProps from '@props/contactProps'


const ContactsTable = ({contactId,index,showEditForm}:any) => {
    const { contact } = useGetContactsQuery("contactsList", {
        selectFromResult: ({ data }) => ({
            contact: data?.entities[contactId]
        }),
      })
      const [userContacts, setUserContacts] = useState([])  
      useEffect(() => {
if(contact){
        setUserContacts(contact.contacts)
}
        // return () => {
        //   effect
        // };
      }, [contact])

   
        return (
       
        <>
        {
          userContacts.map((user:string,i:number)=><ContactTableData contactId={user} key={user}  index={i}/>)
    
        }
        </>
        )
    
  
}

export default React.memo(ContactsTable)
