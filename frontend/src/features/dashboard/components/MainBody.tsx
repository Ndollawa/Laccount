import React,{useState,useEffect, ReactNode} from "react";
import { Link } from "react-router-dom";
import $ from 'jquery'
import Preloader from "../../components/preloader/Preloader";
import { useIsLoading } from "../../components/preloader/slices/preloader.slice";
import Header from "./Header";
import SideBar from "./SideBar";
import Chatbox from "./ChatBox";
import Footer from "./Footer";
import { useSelector } from 'react-redux';
import {useCompanyInfo,useDashboardConfig, useLandingConfig} from '../pages/Settings/slices/settings.slice';
import { selectCurrentUser } from "../../auth/slices/auth.slice";
import useWindowSize from "../../../app/hooks/useWindowSize";
import AppSettings from "./AppSettings";
import ThemePanel from "./ThemePanel";
import useUserActivity from "../../../app/hooks/useUserActivity";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const MainBody = ({children}:{children:React.ReactNode}) => {
const currentUser = useSelector(selectCurrentUser)
useUserActivity()
    const isLoading = useSelector(useIsLoading);
    // console.log(isLoading)
    const [isToggled,setIsToggled] = useState(false);
    const {width, height} =useWindowSize();  
const pageData ={
    pageTitle: 'Dashboard'
}
const {settings:{companyDetails:{siteName}={}}={}} = useSelector(useCompanyInfo);
const {settings:{siteImages: {logo,favicon, logoDark}={}}={}} = useSelector(useLandingConfig)
const {settings:{dashboardConfig:{layoutOptions:{
    typography,
    version,
    layout,
    headerBg,
    primary,
    navheaderBg,
    sidebarBg,
    sidebarStyle,
    sidebarPosition,
    headerPosition,
    containerLayout,
    direction
}={}}={}}={}} = useSelector(useDashboardConfig);

const toggleMenu = ()=>{
setIsToggled(prev=> !prev);

}
let menuWrapperStyle = isToggled? "menu-toggle " : " ";
menuWrapperStyle += !isLoading ? " show" :" ";


useEffect(() => {
var body = $('#body');
var html = $('html');
    if(width! < 1200) {
        body.attr("data-layout", "vertical");
        body.attr("data-container", "wide");
    }

    if(width! > 767 && width! < 1200) {
        body.attr("data-sidebar-style", "mini");
    }

    if(width! < 768) {
        body.attr("data-sidebar-style", "overlay");
    }
//   return () => {
//     effect
//   };
}, [width])

var handleMiniSidebar = function() {
    $("ul#menu>li").on('click', function() {
        const sidebarStyle = $('#body').attr('data-sidebar-style');
        if (sidebarStyle === 'mini') {
            // console.log($(this).find('ul'))
            $(this).find('ul').stop()
        }
    })
}
handleMiniSidebar()

var handleMinHeight = function() {
    var win_h = window.outerHeight;
    var win_h = window.outerHeight;
    if (win_h > 0 ? win_h : height) {
        $(".content-body").css("min-height", (win_h + 60) + "px");
    };
}
handleMinHeight()

var handleHeaderHight = function() {
    const headerHight = $('.header').innerHeight();
    $(window).scroll(function() {
        if ($('#body').attr('data-layout') === "horizontal" && $('#body').attr('data-header-position') === "static" && $('#body').attr('data-sidebar-position') === "fixed")
            $(this.window).scrollTop()! >= headerHight! ? $('.deznav').addClass('fixed') : $('.deznav').removeClass('fixed')
    });
}
handleHeaderHight()


  return (
   <>
   <div  id="body" data-typography={typography} data-theme-version={version} data-layout={layout} data-nav-headerbg={headerBg} data-headerbg={navheaderBg} data-sidebar-style={sidebarStyle} data-sidebarbg={sidebarBg} data-sidebar-position={sidebarPosition} data-header-position={headerPosition} data-container={containerLayout} data-direction={direction} data-primary={primary}>

{/* <!--*******************
    Preloader startdirection={direction}
********************--> */}
<Preloader/>
{/* <!--*******************
    Preloader end
********************-->

<!--**********************************
    Main wrapper start
***********************************-->className="show menu-toggle" */}
<div id="main-wrapper" className={ menuWrapperStyle} >
{/* 
    <!--**********************************
        Nav header start
    ***********************************--> */}
           <div className="nav-header">
            <Link to="/dashboard" className="brand-logo">
              {(isToggled || width! < 728 || sidebarStyle === 'mini') ?<img src={BASE_URL+"/uploads/settings/"+favicon} alt={siteName} width='30'/> :<img src={version === 'dark'? BASE_URL+"/uploads/settings/"+logoDark : BASE_URL+"/uploads/settings/"+logo} alt={siteName} width='150'/>} 
            </Link>

            <div className="nav-control">
                <div className={isToggled?"hamburger is-active": "hamburger"} onClick={toggleMenu}>
                    <span className="line"></span><span className="line"></span><span className="line"></span>
                </div>
            </div>
        </div>
        {/* <!--**********************************
            Nav header end
        ***********************************--> */}
	    {/* <!--**********************************
            Chat box Start
        ***********************************--> */}
          <Chatbox/>
        {/* <!--**********************************
            Chat box End
        ***********************************--> */}
        <Header />
        <SideBar />
        	
		{/* <!--**********************************
            Content body start
        ***********************************--> */}
        {/* <Breadcrum /> */}
        <div className="content-body" style={{position:'relative',height:'fit-content(100%)'}}>
			
				
            {children}
   
        </div>
      </div>
        <AppSettings/>
        <ThemePanel/>
    </div>
    <Footer />
   </>
  )
}

export default React.memo(MainBody)

