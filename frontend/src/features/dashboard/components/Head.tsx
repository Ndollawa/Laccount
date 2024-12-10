import React from 'react';
import {Helmet} from 'react-helmet-async'
import PageProps from "@props/pageProps";
import { useSelector } from 'react-redux';
import {useCompanyInfo,useLandingConfig} from '@dashboard/pages/Settings/slices/settings.slice';
const BRAND_ASSETS = import.meta.env.VITE_BRAND_ASSETS;

const Head:React.FC<PageProps> = ({pageData: {pageTitle}={}}:PageProps) => {
const {settings:{companyDetails:{siteName,description}={}}={}} = useSelector(useCompanyInfo); 
const {settings:{siteImages:{favicon}={}}={}} = useSelector(useLandingConfig); 

  return (
    <>
    <Helmet>
   <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
	<meta charSet="utf-8"/>
  <meta name="keywords" content="" />
	<meta name="author" content="" />
	<meta name="robots" content="" />
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
	<meta name="description" content={description} />
	<meta property="og:title" content={siteName} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content="" />
	<meta name="format-detection" content="telephone=no"/>
    <base href='/'/>
    <title>{pageTitle}</title>
    {/* <!-- Favicon icon --> */}
    <link rel="icon" type="image/png" sizes="16x16" href={BRAND_ASSETS+favicon} />
    
	
</Helmet>
</>
  )
}

export default React.memo(Head)
