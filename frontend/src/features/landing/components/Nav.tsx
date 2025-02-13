import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar'
import { useSelector } from 'react-redux';
import {useCompanyInfo,useLandingConfig} from '@dashboard/pages/Settings/slices/settings.slice';
import { selectCurrentUser } from '@auth/slices/auth.slice';
import { Styles } from '@props/settingsProps';


const Nav = () => {
   const {settings:{companyDetails:{email,address,socialMedia:{facebookHandle,twitterHandle,instagram,whatsapp}={}}={}} ={}}  = useSelector(useCompanyInfo); 
const currentUser = useSelector(selectCurrentUser)
    const {settings:{landingPageConfig:{navStyle, showBlog, showTeam}={}}={}} = useSelector(useLandingConfig);
  return (
    <>
   
   
   {
   ((((navStyle as Styles) === Styles.STYLE_1)) || (((navStyle as Styles) === Styles.STYLE_2))) && <div className={((navStyle as Styles) === Styles.STYLE_1)?"topbar":((navStyle as Styles) === Styles.STYLE_2)?  "topbar topbar--two": "topbar"}>
    <div className={((navStyle as Styles) === Styles.STYLE_1)? "container-fluid":((navStyle as Styles) === Styles.STYLE_2)?  "container": "container-fluid"}>
        <div className="topbar__info">
            <Link to="#"><i className="icon-pin"></i>{address}</Link>
            
            { email?.map((e:string)=><a href={`mailto:${e}`} key={e}>  <i className="icon-email"></i>{e}</a>)}
        </div>
        {/* 
        // <!-- /.topbar__info --> */}
       {!navStyle && <div className="topbar__links">
          {!currentUser && <><Link to="/auth/login">Login</Link> <Link to="/auth/register">Sign Up</Link></>}
            <Link to="/blog">Our Blog</Link>
            <Link to="/faqs">FAQs</Link>
        </div>}
        {/* 
        // <!-- /.topbar__links --> */}
     <div className="topbar__social">
           {twitterHandle && <Link to={twitterHandle}><i className="fab fa-twitter"></i></Link>}
           {facebookHandle && <Link to={facebookHandle}><i className="fab fa-facebook"></i></Link>}
           {whatsapp && <Link to={whatsapp}><i className="fab fa-whatsapp"></i></Link>} 
           {instagram && <Link to={instagram}><i className="fab fa-instagram"></i></Link>} 
        </div>
        {/* <!-- /.topbar__social --> */}
    </div> 
    {/* <!-- /.container-fluid --> */}
</div> }
       <nav className={((navStyle as Styles) === Styles.STYLE_1)? "main-menu":((navStyle as Styles) === Styles.STYLE_2)?  "main-menu main-menu--two": "main-menu main-menu--three"}>
            <div className={((navStyle as Styles) === Styles.STYLE_1)? "container-fluid":((navStyle as Styles) === Styles.STYLE_2)?  "container": "container-fluid"}>
                {
                ((navStyle as Styles) === Styles.STYLE_2)?
                <div className='main-menu--two__inner'><NavBar /></div>:<NavBar />
                }
            </div>
            {/* <!-- /.container-fluid --> */}
        </nav>
        {/* <!-- /.main-menu --> */}

        <div className={((navStyle as Styles) === Styles.STYLE_1)? "stricky-header stricked-menu main-menu":((navStyle as Styles) === Styles.STYLE_2)?  "stricky-header stricked-menu main-menu main-menu--two": "stricky-header stricked-menu main-menu main-menu--three"}>
            <div className="sticky-header__content"></div>
            {/* <!-- /.sticky-header__content --> */}
        </div>
    </>
  )
}

export default React.memo(Nav)