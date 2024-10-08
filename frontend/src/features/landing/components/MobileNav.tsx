import React from 'react';
import { useSelector } from 'react-redux';
import {useCompanyInfo, useLandingConfig} from '../../dashboard/pages/Settings/slices/settings.slice';
import useWindowSize from '../../../app/hooks/useWindowSize';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const MobileNav = () => {
    const {width} = useWindowSize()
    const {settings:{siteName,email,contact,description,activeHours,socialMedia:{facebookHandle,twitterHandle,instagram,whatsapp}={}}={}} = useSelector(useCompanyInfo);
    const {settings:{siteImages:{logoIcon,logo}={}}={}} = useSelector(useLandingConfig); 
  return (
    <div className="mobile-nav__wrapper">
    <div className="mobile-nav__overlay mobile-nav__toggler"></div>
    
    {/* <!-- /.mobile-nav__overlay --> */}
    <div className="mobile-nav__content">
        <span className="mobile-nav__close mobile-nav__toggler"><i className="fa fa-times"></i></span>

        <div className="logo-box">
            <a href="/" aria-label="logo image"><img src={width! < 660? BASE_URL+"/uploads/settings/"+logoIcon : BASE_URL+"/uploads/settings/"+logo} width="150" alt={siteName} /></a>
        </div>
        
        {/* <!-- /.logo-box --> */}
        <div className="mobile-nav__container"></div>
        
        {/* <!-- /.mobile-nav__container --> */}

        <ul className="mobile-nav__contact list-unstyled">
        { 
                              email?.map((e:string)=>(
                                <li key={e}>
                                    <i className="icon-email"></i>
                                    <a href={`mailto:${e}`}>{e}</a>
                                </li>
                              )) }
                            
                              { contact?.map((c:string)=>(
                                    <li key={c}>
                                    <i className="icon-telephone"></i>
                                    <a href={`tel:${c}`}>{c}</a>
                                </li>
                                  ))
                                }
        </ul>
        {/* <!-- /.mobile-nav__contact --> */}

        <div className="mobile-nav__social">
        {twitterHandle && <a href={twitterHandle}><i className="fab fa-twitter"></i></a>}
        {facebookHandle && <a href={facebookHandle}><i className="fab fa-facebook"></i></a>}
        {whatsapp && <a href={whatsapp}><i className="fab fa-whatsapp"></i></a>} 
        {instagram && <a href={instagram}><i className="fab fa-instagram"></i></a>} 
        </div>
        {/* <!-- /.mobile-nav__social --> */}

    </div>
    
    {/* <!-- /.mobile-nav__content --> */}
</div>
  )
}

export default React.memo(MobileNav)
