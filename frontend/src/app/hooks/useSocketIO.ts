import {io,Socket} from 'socket.io-client'
import { useEffect,useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '@auth/slices/auth.slice'

const useSocketIO = () =>{
const socket = useRef<any>()
const user = useSelector(selectCurrentUser)
useEffect(()=>{
   const socketIO:Socket = io(import.meta.env.VITE_BACKEND_URL)
   socket.current = socketIO
   socket.current.emit('addUser', user.id)
   return ()=>{
    socket.current.disconnect()
}
},[])
return socket
}

export default useSocketIO