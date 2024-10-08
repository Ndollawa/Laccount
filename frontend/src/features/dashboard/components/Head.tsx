import React from 'react';
import {Helmet} from 'react-helmet-async'
import pageProps from "../../../app/props/pageProps";
import { useSelector } from 'react-redux';
import {useCompanyInfo,useLandingConfig} from '../pages/Settings/slices/settings.slice';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Head:React.FC<pageProps> = ({pageData}:pageProps) => {
const {settings:{companyDetails:{siteName,description}={}}={}} = useSelector(useCompanyInfo); 
const {settings:{siteImages:{favicon}={}}={}} = useSelector(useLandingConfig); 
const {pageTitle} = pageData!;
  return (
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
    <link rel="icon" type="image/png" sizes="16x16" href={BASE_URL+"/uploads/settings/"+favicon} />
	
</Helmet>
  )
}

export default React.memo(Head)
