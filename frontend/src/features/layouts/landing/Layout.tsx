import React, { useEffect, useRef, useCallback } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCompanyInfo, useLandingConfig } from '@dashboard/pages/Settings/slices/settings.slice';
import Nav from '@landing/components/Nav';
import Head from '@landing/components/Head';
import Footer from '@landing/components/Footer';
import Js from '@landing/components/Js';
import Css from '@landing/components/Css';
import MobileNav from '@landing/components/MobileNav';
import Search from '@landing/components/Search';
import PageProps from "@props/pageProps";
const BRAND_ASSETS = import.meta.env.VITE_BRAND_ASSETS;

const Home: React.FC<PageProps> = ({ pageData }: PageProps) => {
  const preloaderRef = useRef<HTMLDivElement | null>(null);
  const mobileNavContainerRef = useRef<HTMLDivElement | null>(null);
  const stickyHeaderRef = useRef<HTMLDivElement | null>(null);
  const { settings: { siteImages: { favicon, logoIcon } = {} ,colors: {primary, secondary, tertiary}={}} = {} } = useSelector(useLandingConfig);
  useEffect(() => {
    // On component load, update the CSS variables
    if (primary) {
      document.documentElement.style.setProperty('--thm-base', primary);
      document.documentElement.style.setProperty('--thm-priary', primary);
    }
    if (secondary) {
      document.documentElement.style.setProperty('--thm-secondary', secondary);
    }
    if (tertiary) {
      document.documentElement.style.setProperty('--thm-color', tertiary);
    }
  }, [primary, secondary, tertiary]);

  const handleScroll = useCallback(() => {
    if (window.scrollY > 130 && stickyHeaderRef.current) {
      stickyHeaderRef.current.classList.add('stricky-fixed');
    } else {
      stickyHeaderRef.current?.classList.remove('stricky-fixed');
    }

    const scrollToTop = document.querySelector('.scroll-to-top');
    if (window.scrollY > 100) {
      scrollToTop?.classList.add('visible');
    } else {
      scrollToTop?.classList.remove('visible');
    }
      
     
  }, []);


   useEffect(() => {
       const mainStyles = document.getElementById(
         "main-styles"
       )! as HTMLLinkElement;
       mainStyles.href = "assets/css/finlon.css";
     return () => {
      mainStyles.href = "dashboard-assets/css/zenix.css";
     };
   }, [])
  useEffect(() => {
    if (preloaderRef.current) {
      preloaderRef.current.style.display = 'none';
    }

    if (mobileNavContainerRef.current) {
      mobileNavContainerRef.current.innerHTML = document.querySelector('.main-menu__nav')?.innerHTML || '';
    }

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <>

      {/* <Css/> */}
      <Head pageData={pageData} />
      <div className="custom-cursor">
        <div className="custom-cursor__cursor"></div>
        <div className="custom-cursor__cursor-two"></div>

        <div className="preloader" ref={preloaderRef}>
          <div className="preloader__image" style={{ backgroundImage: `url(${BRAND_ASSETS}${logoIcon || favicon})` }}></div>
        </div>

        <div className="page-wrapper">
          <Nav />
          <Outlet />
          <Footer />
        </div>

        <MobileNav ref={mobileNavContainerRef} />
        <Search />

        <Link to="#" className="scroll-to-target scroll-to-top">
          <i className="fa fa-angle-up"></i>
        </Link>
      </div>

      <Js />
    </>
  );
};

export default React.memo(Home);
