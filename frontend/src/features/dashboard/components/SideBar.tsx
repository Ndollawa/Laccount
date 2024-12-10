import React,{useEffect, useTransition} from 'react'
import { Link } from 'react-router-dom'
import PerfectScroll from 'react-perfect-scrollbar'
import $ from 'jquery'
import { useSelector } from 'react-redux';
import SideNav from './SideBarComponent/SideNav'
import PageProps from '@props/pageProps'
import { useCompanyInfo } from '@dashboard/pages/Settings/slices/settings.slice';
import { selectCurrentUser } from '@auth/slices/auth.slice';
import useUserImage from '@hooks/useUserImage';
import { getUserFullName } from '@utils/getUserName';

enum Styles{STYLE_1,STYLE_2, STYLE_3};

const SideBar:React.FC<PageProps> = ({pageData,}:PageProps) => {

     const {settings:{companyDetails:{siteName}={}}={}} = useSelector(useCompanyInfo);
    const currentUser= useSelector(selectCurrentUser)
    const userImage = useUserImage(currentUser)
    const [isPending, startTransition] = useTransition();
  
    useEffect(()=>{
          startTransition(() => {

          const handleMetisMenu = () =>{
           $('.metismenu > .mm-active ').each(function(){
              if($(this).children('ul').length > 0)
              {
                 $(this).addClass('active-no-child');
              }
           });
        }
     handleMetisMenu();  
      });
     
     },[])
    return (
        <>        
    <div className="deznav p-relative">
        <div className='deznav-scroll'>
            <div className="main-profile">
                <div className="image-bx">
                    <img src={userImage} alt={getUserFullName(currentUser) || currentUser?.username}/>
                    <Link to="/dashboard/profile/edit"><i className="fa fa-cog" aria-hidden="true"></i></Link>
                </div>
                <h5 className="name"><span className="font-w400">Hello,</span> {currentUser?.fullName || currentUser?.username}</h5>
                <p className="email">{currentUser.email}</p>
            </div>
            <SideNav/>
            <div className="copyright p-absolute bottom-0 left-0 right-0">
                <p><strong>{siteName}</strong><br/> © 2022 -  All Rights Reserved</p>
                <p className="fs-12">Made with <span className="fa fa-heart"></span> by <a href="mailto:foundictsolutions@gmail.com">Found ICT Solutions</a></p>
            </div>
        </div>
    </div>
               </>
  )
}

export default React.memo(SideBar)

