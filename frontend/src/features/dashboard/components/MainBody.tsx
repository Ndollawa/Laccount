import React, { useState, useEffect, ReactNode, useCallback, useTransition } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import Preloader from "@components/preloader/Preloader";
import { useIsLoading } from "@components/preloader/slices/preloader.slice";
import Header from "./Header";
import SideBar from "./SideBar";
import Chatbox from "./ChatBox";
import Footer from "./Footer";
import { useCompanyInfo, useDashboardConfig, useLandingConfig } from '@dashboard/pages/Settings/slices/settings.slice';
import { selectCurrentUser } from "@auth/slices/auth.slice";
import useWindowSize from "@hooks/useWindowSize";
import useUserActivity from "@hooks/useUserActivity";
import useLocalStorage from "@hooks/useLocalStorage";
import AppSettings from "./AppSettings";
import ThemePanel from "./ThemePanel";

const BRAND_ASSETS = import.meta.env.VITE_BRAND_ASSETS;

const MainBody = ({ children }: { children: ReactNode }) => {
    const currentUser = useSelector(selectCurrentUser);
    useUserActivity();

    const isLoading = useSelector(useIsLoading);
    const [isToggled, setIsToggled] = useState(false);
    const { width, height } = useWindowSize();
    const [isPending, startTransition] = useTransition();
    const [theme, setTheme] =  useLocalStorage('appThemeMode','light');
    const { settings: { companyDetails: { siteName } = {} } = {} } = useSelector(useCompanyInfo);
    const { settings: { siteImages: { logo, logoIcon, favicon, logoDark } = {} } = {} } = useSelector(useLandingConfig);
    const {
        settings: {
            dashboardConfig: {
                layoutOptions: {
                    typography, version, layout, headerBg, primary, navheaderBg,
                    sidebarBg, sidebarStyle, sidebarPosition, headerPosition, containerLayout, direction
                } = {}
            } = {}
        } = {}
    } = useSelector(useDashboardConfig);
    const [themeMode, setThemeMode] =  useLocalStorage('appThemeMode','light');
    const toggleMenu = useCallback(() => {
        setIsToggled((prev) => !prev);
    }, []);

    useEffect(() => {
        startTransition(() => {
          const body = document.body;
          const html = document.documentElement;
      
          // Apply layout settings from the Redux state
          body.setAttribute("data-typography", typography as string);
          body.setAttribute("data-theme-version", themeMode as string);
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
      
    let menuWrapperStyle = isToggled ? "menu-toggle" : "";
    menuWrapperStyle += !isLoading ? " show" : "";

    return (
        <>
            <div id="body">
                <Preloader />
                <div id="main-wrapper" className={menuWrapperStyle}>
                    <div className="nav-header">
                        <Link to="/dashboard" className="brand-logo">
                            {(isToggled || width as number < 728 || sidebarStyle === 'mini') ? (
                                <img src={`${BRAND_ASSETS}${ logoIcon || favicon }`} alt={siteName} width="30" />
                            ) : (
                                <img src={version === 'dark' ? `${BRAND_ASSETS}${logoDark}` : `${BRAND_ASSETS}${logo}`} alt={siteName} width="150" />
                            )}
                        </Link>
                        <div className="nav-control">
                            <div className={`hamburger ${isToggled ? " is-active" : null}`} onClick={toggleMenu}>
                                <span className="line"></span>
                                <span className="line"></span>
                                <span className="line"></span>
                            </div>
                        </div>
                    </div>
                    <Chatbox />
                    <Header />
                    <SideBar />
                    <div className="content-body" style={{ position: 'relative', height: 'fit-content' }}>
                        {children}
                    </div>
                </div>
                <AppSettings />
                <ThemePanel />
            </div>
            <Footer />
        </>
    );
};

export default React.memo(MainBody);
