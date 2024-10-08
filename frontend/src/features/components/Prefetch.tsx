import { store } from "../../app/stores/store";
import {usersApiSlice} from "../dashboard/pages/Users/slices/usersApi.slice";
import {contactsApiSlice} from "../dashboard/pages/Contact/slices/contactsApi.slice";
import { faqsApiSlice } from "../dashboard/pages/Faq/slices/faqApi.slice";
import { slidesApiSlice } from "../dashboard/pages/Slide/slidesApiSlice";
import {roomsApiSlice } from "../dashboard/pages/Rooms/slices/roomsApi.slice";
import { teamsApiSlice } from "../dashboard/pages/Team/slices/teamsApi.slice";
import { messagesApiSlice } from "../dashboard/pages/Messenger/slices/messagesApi.slice";
import { servicesApiSlice } from "../dashboard/pages/Service/slices/servicesApi.slice";
import { conversationsApiSlice } from "../dashboard/pages/Messenger/slices/conversationsApi.slice";
import { postsApiSlice } from "../dashboard/pages/Post/slices/postApi.slice";
import { postCategoryApiSlice } from "../dashboard/pages/PostCategory/slices/postCategoryApi.slice";
import { settingsApiSlice } from "../dashboard/pages/Settings/slices/settingApi.slice";
import {useSelector} from 'react-redux';
import { selectCurrentUser } from "../auth/slices/auth.slice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch =()=>{
  // const user = useSelector(selectCurrentUser)
  useEffect(() => {
    store.dispatch(settingsApiSlice.util.prefetch('getSettings', 'settingsList', { force: true }))
    // store.dispatch(faqsApiSlice.util.prefetch('getFaqs', 'faqsList', { force: true }))
    // store.dispatch(slidesApiSlice.util.prefetch('getSlides', 'slidesList', { force: true }))
  //   store.dispatch(slices/teamsApi.slice.util.prefetch('getTeams', 'teamsList', { force: true }))
  //   store.dispatch(servicesApiSlice.util.prefetch('getServices', 'servicesList', { force: true }))
  //   store.dispatch(slices/postCategoryApi.slice.util.prefetch('getPostCategory', 'categoriesList', { force: true }))
  //   store.dispatch(postsApiSlice.util.prefetch('getPosts', 'postsList', { force: true }))
  //  if(user.id){
    // store.dispatch(slices/usersApi.slice.util.prefetch('getUsers', 'usersList', { force: true }))
    // store.dispatch(slices/contactsApi.slice.util.prefetch('getContacts', 'contactsList', { force: true }))
    // store.dispatch(conversationsApiSlice.util.prefetch('getConversations', 'conversationsList', { force: true }))
    // store.dispatch(slices/messagesApi.slice.util.prefetch('getMessages', 'messagesList', { force: true }))
    // store.dispatch(slices/roomsApi.slice.util.prefetch('getRooms', 'roomsList', { force: true }))
  //  } 
}, [])
    return <Outlet/>
}

export default Prefetch