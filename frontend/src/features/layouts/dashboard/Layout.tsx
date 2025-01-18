import React, {useEffect, useRef} from 'react'
import { Outlet } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { Helmet } from 'react-helmet';
import $ from 'jquery'
import Head from '@dashboard/components/Head';
import PageProps from '@props/pageProps';
import {  setPreloader } from '@components/preloader/slices/preloader.slice';
import Js from '@dashboard/components/Js';
import Css from '@dashboard/components/Css';



const Layout:React.FC<PageProps> = ({pageData}:PageProps) => { 

   useEffect(() => {
       const mainStyles = document.getElementById(
         "main-styles"
       )! as HTMLLinkElement;
       mainStyles.href = "dashboard-assets/css/zenix.css";

      // Hide the preloader after 4.5 seconds
      // setTimeout(() => dispatch(setPreloader(false)), 500);
    
      // Function to toggle chatbox visibility
      const toggleChatbox = (selector:string, className:string, action:string) => {
        document.querySelectorAll(selector).forEach(element => {
          element.addEventListener('click', () => {
            document.querySelector('.chatbox')?.classList[action](className);
          });
        });
      };
    
      // Open chatbox when .bell-link is clicked and close when .chatbox-close is clicked
      toggleChatbox('.bell-link', 'active', 'add');
      toggleChatbox('.chatbox-close', 'active', 'remove');
    

     return () => {
      mainStyles.href = "assets/css/finlon.css";
     };
   }, [])
  return (
    <>
    {/* {styles.current} */}
    {/* <Css/> */}
        <Head pageData={pageData}/>
          <Outlet/>
        <Js/>
    </>
  )
}

export default React.memo(Layout)
