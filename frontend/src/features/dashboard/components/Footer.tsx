import React from 'react';
import { useSelector } from 'react-redux';
import {useCompanyInfo} from '../pages/Settings/settingsConfigSlice';
import pageProps from '../../../app/utils/props/pageProps'



const Footer:React.FC<pageProps> = ({pageData}:pageProps) => {
  const {siteName} = useSelector(useCompanyInfo); 
   const year = new Date().getFullYear()
   
  return (
    <>
              <div className="footer">
            <div className="copyright">
                <p>{siteName} Copyright © Designed &amp; Developed by <a href="mailto:foundictsolutions@gmail.com">Found ICT Solutions</a> 2022 - { year}</p>
            </div>
        </div>
    </>
  )
}

export default React.memo(Footer)
