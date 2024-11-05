import React from 'react'
import { useSelector } from 'react-redux';
import {useCompanyInfo,useLandingConfig,} from '@dashboard/pages/Settings/slices/settings.slice';

import PageProps from '@props/pageProps'
const BRAND_ASSETS = import.meta.env.VITE_BRAND_ASSETS;


const Breadcrum:React.FC<PageProps> = ({pageData: {pageTitle}={}}:PageProps) => {
const {settings:{siteImages:{pagesBg}={}}={}} = useSelector(useLandingConfig); 
  return (
<section className="page-header">
    <div className="page-header__bg" style={{backgroundImage: `url('${BRAND_ASSETS+pagesBg}')`}}>
    </div>
    <div className="container"><div className="thm-breadcrumb list-unstyled"> 
    <span property="itemListElement" typeof="ListItem">
        <a property="item" typeof="WebPage" title="Go to Home." href="/" className="home">
            <span property="name">Home</span></a>
            <meta property="position" content="1" />
        </span>
            /<span property="itemListElement" typeof="ListItem">
                <span property="name" className="post post-page current-item">{pageTitle}</span>
    <meta property="position" content="2"/></span></div><h2>{pageTitle}</h2></div>
    </section>

  )
}

export default React.memo(Breadcrum)
