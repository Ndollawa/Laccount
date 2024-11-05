import React from 'react'
import { useSelector } from 'react-redux'
import { useGetUsersQuery } from '@dashboard/pages/Users/slices/usersApi.slice'
import { selectCurrentUser } from '@auth/slices/auth.slice'
import useUserImage from '@hooks/useUserImage'
import { format } from 'timeago.js'

const Conversation = ({openChat,conversation ,i}:any) => {
  const currentUser = useSelector(selectCurrentUser)
  
  const contactId = conversation?.members.filter((m:string) => m !== currentUser?.id )
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[contactId]		 
    }),
    }) 
const userImage = useUserImage(user)
  return (
    <li className="active dz-chat-user"key={conversation?.id+i} onClick={()=>openChat(user?.id)}>
    <div className="d-flex bd-highlight">
        <div className="img_cont">
            <img src={userImage} className="rounded-circle user_img" alt=""/>
            <span className={`online_icon ${(user?.online?.status)? 'online':'offline'}`} ></span>
        </div>
        <div className="user_info">
            <span>{user?.fullName || user?.username}</span>
            <p>{(user?.online?.status)? `${user?.username} is Online`: `${user?.username} left ${format(user?.online?.lastSeen)}`}</p>
        </div>
    </div>
</li>
  )
}

export default React.memo(Conversation)