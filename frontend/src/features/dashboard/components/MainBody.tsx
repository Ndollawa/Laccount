import React, { useState, useEffect, ReactNode, useCallback, useTransition } from "react";
import { Link } from "react-router-dom";
import $ from 'jquery';
import { useSelector } from 'react-redux';
import Preloader from "../../components/preloader/Preloader";
import { useIsLoading } from "../../components/preloader/slices/preloader.slice";
import Header from "./Header";
import SideBar from "./SideBar";
import Chatbox from "./ChatBox";
import Footer from "./Footer";
import { useCompanyInfo, useDashboardConfig, useLandingConfig } from '../pages/Settings/slices/settings.slice';
import { selectCurrentUser } from "../../auth/slices/auth.slice";
import useWindowSize from "../../../app/hooks/useWindowSize";
import AppSettings from "./AppSettings";
import ThemePanel from "./ThemePanel";
import useUserActivity from "../../../app/hooks/useUserActivity";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const MainBody = ({ children }: { children: React.ReactNode }) => {
    const currentUser = useSelector(selectCurrentUser);
    useUserActivity();

    const isLoading = useSelector(useIsLoading);
    const [isToggled, setIsToggled] = useState(false);
    const { width, height } = useWindowSize();
    const [isPending, startTransition] = useTransition();
   
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

    const toggleMenu = useCallback(() => {
        setIsToggled((prev) => !prev);
    }, []);

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
                $(window).scrollTop() as number >= headerHeight as number
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

    let menuWrapperStyle = isToggled ? "menu-toggle" : "";
    menuWrapperStyle += !isLoading ? " show" : "";

    return (
        <>
            <div id="body">
                <Preloader />
                <div id="main-wrapper" className={menuWrapperStyle}>
                    <div className="nav-header">
                        <Link to="/dashboard" className="brand-logo">
                            {(isToggled || width < 728 || sidebarStyle === 'mini') ? (
                                <img src={`${BASE_URL}/uploads/settings/brand/${ logoIcon || favicon }`} alt={siteName} width="30" />
                            ) : (
                                <img src={version === 'dark' ? `${BASE_URL}/uploads/settings/brand/${logoDark}` : `${BASE_URL}/uploads/settings/brand/${logo}`} alt={siteName} width="150" />
                            )}
                        </Link>
                        <div className="nav-control">
                            <div className={isToggled ? "hamburger is-active" : "hamburger"} onClick={toggleMenu}>
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
