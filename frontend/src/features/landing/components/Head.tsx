import React from 'react';
import {Helmet} from 'react-helmet-async';
import PageProps from "@props/pageProps";
import { useSelector } from 'react-redux';
import {useCompanyInfo,useLandingConfig} from '@dashboard/pages/Settings/slices/settings.slice';
const BRAND_ASSETS = import.meta.env.VITE_BRAND_ASSETS;

const Head:React.FC<PageProps> = ({pageData: {pageTitle} ={}}:PageProps) => {
  
const {settings:{companyDetails:{siteName,description}={}}={}} = useSelector(useCompanyInfo); 
const {settings:{siteImages:{favicon}={}}={}} = useSelector(useLandingConfig); 
  return (
    <Helmet>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   
    <title>{pageTitle+" - "+siteName}</title>
   
    <link rel="apple-touch-icon" sizes="180x180" href={BRAND_ASSETS+favicon}/>
    <link rel="icon" type="image/png" sizes="32x32" href={BRAND_ASSETS+favicon} />
    <link rel="icon" type="image/png" sizes="16x16" href={BRAND_ASSETS+favicon} />
    <meta name="description" content={description} />


    <base href="/"/>


    
</Helmet>
  )
}

export default React.memo(Head)
