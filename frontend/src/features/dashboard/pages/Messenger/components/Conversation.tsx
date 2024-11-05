import React from 'react'
import { useSelector } from 'react-redux'
import {  Link } from 'react-router-dom'
import { useGetUsersQuery } from '../../Users/slices/usersApi.slice'
import { useGetMessagesQuery } from '../slices/messagesApi.slice'
import { selectCurrentUser } from '../../../../auth/slices/auth.slice'
import useUserImage from '@hooks/useUserImage'
import { format } from 'timeago.js'
import MessageProps from '@props/messageProps'

const Conversation = ({conversation,i}:any) => {
  const currentUser = useSelector(selectCurrentUser)
  const contactId = conversation?.members.filter((m:string) => m !== currentUser?.id )
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[contactId]		 
    }),
    }) 
  
      const { messages } = useGetMessagesQuery("messagesList", {
      selectFromResult: ({ data }) => ({
        messages: data && (Object.values(data?.entities) as MessageProps[])?.filter((m:MessageProps)=> m?.conversationId === conversation?.id)		 
      }),
      }) 
      // console.log(messages)
const userImage = useUserImage(user)
const lastMsg = messages[messages.length-1]
  const userConversation =(
    <Link to={`/dashboard/messenger/${user.id}`}>
  <div className="chat-list-area">
  <div className="image-bx">
    <img src={userImage} alt="" className="rounded-circle object-fit-cover img-1"/>
    	<span className={`${(user?.online?.status)? 'online_icon online': 'online_icon offline'}`}></span>
										
  </div>
  <div className="info-body">
    <div className="d-flex">
      <h6 className="text-black user-name mb-0 font-w600 fs-16">{user?.fullName || user?.username}</h6>
      <span className="ms-auto fs-14">{format(lastMsg?.createdAt)}</span>
    </div>
    <p className="">{lastMsg?.message}</p>
  </div>
</div>
</Link>


) 
  return (
    <>{userConversation}</>
  )
}

export default React.memo(Conversation)