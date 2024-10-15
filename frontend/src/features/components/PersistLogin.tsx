import { Outlet , useLocation, Navigate} from "react-router-dom";
import React,{ useState, useEffect,useRef, useTransition } from "react";
import { useSelector, useDispatch } from 'react-redux';
import $ from 'jquery';
import { useRefreshMutation } from "../auth/slices/authApi.slice";
import { selectCurrentToken } from '../auth/slices/auth.slice';
import { setPreloader } from "./preloader/slices/preloader.slice";
import useLocalStorage from "../../app/hooks/useLocalStorage";
import { useDashboardConfig } from '../dashboard/pages/Settings/slices/settings.slice';
import Preloader from "./preloader/Preloader";
import useWindowSize from "../../app/hooks/useWindowSize";

const PersistLogin = () =>{
    const [trueSuccess, setTrueSuccess] = useState(false);
    const [ persist ] = useLocalStorage('persist',false);
    const token = useSelector(selectCurrentToken);
    const effectRan = useRef(false);
    const location = useLocation();
    const dispatch = useDispatch();


const [refresh,{
    isUninitialized,
    isLoading,
    isSuccess,
    isError,
    error
}] = useRefreshMutation();
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
const [isPending, startTransition] = useTransition();

const { width, height } = useWindowSize();
useEffect(() => {
 startTransition(() => {
  const body = $('#body')!;
  const html = $('html')!;
  // Apply layout settings from the Redux state
  body.attr({
      "data-typography": typography,
      "data-theme-version": version,
      "data-layout": layout,
      "data-nav-headerbg": navheaderBg,
      "data-headerbg": headerBg,
      "data-sidebar-style": sidebarStyle,
      "data-sidebarbg": sidebarBg,
      "data-sidebar-position": sidebarPosition,
      "data-header-position": headerPosition,
      "data-container": containerLayout,
      "data-direction": direction,
      "data-primary": primary,
  });

  // Handle responsive design based on window width
  if (width as number < 1200) {
      body.attr("data-layout", "vertical");
      body.attr("data-container", "wide");
  }
  if (width as number > 767 && width as number < 1200) {
      body.attr("data-sidebar-style", "mini");
  }
  if (width as number < 768) {
      body.attr("data-sidebar-style", "overlay");
  }

  // Adjust min height of the content body
  $(".content-body").css("min-height", `${Math.max(height as number, window.outerHeight) + 60}px`);

  // Scroll behavior for header height
  const headerHeight = $('.header').innerHeight();
  $(window).on('scroll', () => {
      const isHorizontal = body.attr('data-layout') === "horizontal";
      const isStaticHeader = body.attr('data-header-position') === "static";
      const isFixedSidebar = body.attr('data-sidebar-position') === "fixed";

      if (isHorizontal && isStaticHeader && isFixedSidebar) {
          ($(window).scrollTop() as number) >= headerHeight! as number
              ? $('.deznav').addClass('fixed')
              : $('.deznav').removeClass('fixed');
      }
  });
  }); 

  return () => {
      // Cleanup event listeners
      $(window).off('scroll');
  };
}, [width, height, typography, version, layout, navheaderBg, headerBg, sidebarStyle, sidebarBg, sidebarPosition, headerPosition, containerLayout, direction, primary]);


useEffect(() =>{

    startTransition(() => {
    if(effectRan.current === true || process.env.NODE_ENV !== 'development'){
        // react 18 strict mode
        const verifyRefreshToken = async () =>{
            try{
                await refresh();
                setTrueSuccess(true)
            }catch(error){
                console.error(error);
            }
           
        }
        if(!token && persist){verifyRefreshToken()} 
       
    }})
  return () =>{
     effectRan.current = true;
    }
  //eslint-disable-next-line
}, [])
 let content;
 if(!persist){
    content =  <Outlet/>
          }else if(isLoading){
            content =(
            <div className="h-100" id="body">
                    <div className="authincation h-100">
                   <Preloader/>
                    </div>
      
                </div>)
                }else if(isError){
                  content = <Navigate to={'/auth/login'} replace state={{from:location}}/>

                }else if(!isLoading && isSuccess && trueSuccess){
                   content = <Outlet/> 
                }else if(token && isUninitialized){
                  content =  <Outlet/>
                }
    useEffect(()=>{
dispatch(setPreloader(isLoading? true :false))
},[isLoading])            
    return(
        <>
        {content}
        </>
    )
}

export default React.memo(PersistLogin);