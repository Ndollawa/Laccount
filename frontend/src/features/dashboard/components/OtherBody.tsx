import React, { useEffect, useTransition } from 'react'
import { useSelector } from 'react-redux';
import $ from 'jquery';
import useWindowSize from "../../../app/hooks/useWindowSize";
import {useCompanyInfo,useDashboardConfig} from '../pages/Settings/slices/settings.slice';
import useLocalStorage from '../../../app/hooks/useLocalStorage';


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
  const body = $('#body')!;
  const html = $('html')!;
  // Apply layout settings from the Redux state
  body.attr({
      "data-typography": typography,
      "data-theme-version": themeMode,
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