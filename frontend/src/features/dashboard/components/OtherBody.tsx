import React, { useEffect, useTransition } from 'react'
import { useSelector } from 'react-redux';
import useWindowSize from '@hooks/useWindowSize';
import useLocalStorage from '@hooks/useLocalStorage';
import {useCompanyInfo,useDashboardConfig} from '@dashboard/pages/Settings/slices/settings.slice';


const OtherBody = ({children}:{children:React.ReactNode}) => {
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
const [themeMode] =  useLocalStorage('appThemeMode','light');

const { width, height } = useWindowSize();
useEffect(() => {
  startTransition(() => {
    const body = document.body;
    const html = document.documentElement;

    // Apply layout settings from the Redux state
    body.setAttribute("data-typography", typography as string);
    body.setAttribute("data-theme-version", themeMode as string);
    body.setAttribute("data-bs-theme", themeMode as string);
    body.setAttribute("data-layout", layout as string);
    body.setAttribute("data-nav-headerbg", navheaderBg as string);
    body.setAttribute("data-headerbg", headerBg as string);
    body.setAttribute("data-sidebar-style", sidebarStyle as string);
    body.setAttribute("data-sidebarbg", sidebarBg as string);
    body.setAttribute("data-sidebar-position", sidebarPosition as string);
    body.setAttribute("data-header-position", headerPosition as string);
    body.setAttribute("data-container", containerLayout as string);
    body.setAttribute("data-direction", direction as string);
    body.setAttribute("data-primary", primary as string);

    // Handle responsive design based on window width
    if (width as number < 1200) {
      body.setAttribute("data-layout", "vertical");
      body.setAttribute("data-container", "wide");
    }
    if (width as number > 767 && width as number < 1200) {
      body.setAttribute("data-sidebar-style", "mini");
    }
    if (width as number < 768) {
      body.setAttribute("data-sidebar-style", "overlay");
    }

    // Adjust min height of the content body
    const contentBody = document.querySelector('.content-body') as HTMLElement;
    if (contentBody) {
      contentBody.style.minHeight = `${Math.max(height as number, window.outerHeight) + 60}px`;
    }

    // Scroll behavior for header height
    const header = document.querySelector('.header') as HTMLElement;
    const headerHeight = header?.clientHeight || 0;
    
    const handleScroll = () => {
      const isHorizontal = body.getAttribute('data-layout') === "horizontal";
      const isStaticHeader = body.getAttribute('data-header-position') === "static";
      const isFixedSidebar = body.getAttribute('data-sidebar-position') === "fixed";

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const deznav = document.querySelector('.deznav');

      if (isHorizontal && isStaticHeader && isFixedSidebar && deznav) {
        if (scrollTop >= headerHeight) {
          deznav.classList.add('fixed');
        } else {
          deznav.classList.remove('fixed');
        }
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    return () => {
      // Cleanup event listener
      window.removeEventListener('scroll', handleScroll);
    };
  });
}, [
  width,
  height,
  typography,
  themeMode,
  layout,
  navheaderBg,
  headerBg,
  sidebarStyle,
  sidebarBg,
  sidebarPosition,
  headerPosition,
  containerLayout,
  direction,
  primary,
]);



  return (
    <>
      <div className=" vh-100" id="body" >
              <div className="authincation h-100">
                {children}
              </div>

          </div>
    </>
  )
}

export default React.memo(OtherBody)