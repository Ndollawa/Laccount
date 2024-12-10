import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {NavDropdown} from 'react-bootstrap';
import { FaCogs, FaUserCog, FaUserFriends } from 'react-icons/fa';
import { IoLogOutOutline, IoWalletOutline} from 'react-icons/io5'
import {Button} from 'react-bootstrap'
import {BiTransfer} from 'react-icons/bi'
import {GiTakeMyMoney} from 'react-icons/gi'
import {RxDashboard} from 'react-icons/rx'
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'
import {useCompanyInfo,useLandingConfig} from '@dashboard/pages/Settings/slices/settings.slice';
import {Styles} from '@props/settingsProps';
import useWindowSize from '@hooks/useWindowSize';
import useUserImage from '@hooks/useUserImage';
import { selectCurrentUser } from '@auth/slices/auth.slice';
const BRAND_ASSETS = import.meta.env.VITE_BRAND_ASSETSL;




const NavBar = () => {
const {width} = useWindowSize()
const currentUser = useSelector(selectCurrentUser)
const {settings:{companyDetails:{siteName,contact,activeHours}={}}={}}  = useSelector(useCompanyInfo);
const {settings:{landingPageConfig:{navStyle,showTeam, showBlog}={},siteImages:{logo,favicon, logoIcon}={}}={}} = useSelector(useLandingConfig);
const userImage = useUserImage(currentUser)
    return (
        <>
                <div className="main-menu__logo">

                {
                ((navStyle as Styles) === Styles.STYLE_1) && <><svg xmlns="http://www.w3.org/2000/svg" className="main-menu__logo__shape-1" viewBox="0 0 317 120">
                        <path d="M259.856,120H0V0H274l43,37.481Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="main-menu__logo__shape-2" viewBox="0 0 317 120">
                        <path d="M259.856,120H0V0H274l43,37.481Z" />
                    </svg></>
                        }

                    <Link to="/">
                        <img src={width! < 320? BRAND_ASSETS+(logoIcon || favicon) : BRAND_ASSETS+logo} width={width! <320?"50" :"150"} alt={siteName} />
                    </Link>
                </div>
                {/* <!-- /.main-menu__logo --> */}
                <div className="main-menu__nav">
                    <ul className="main-menu__list">
                        <li >
                            <NavLink className={({isActive})=> isActive ?"current":""} to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about-us"  className={({isActive})=> isActive ?"current":""} >About</NavLink>
                        </li>

                        <li><NavLink to="/services" className={({isActive})=> isActive ?"current":""} >Services</NavLink> </li>
                        {/* <li><a to="#">Pages</a></li> */}
                       {showTeam && <li><NavLink to="/our-team" className={({isActive})=> isActive ?"current":""} >Our Team</NavLink></li>}
                        {showBlog && <li><NavLink to="/our-blog/" className={({isActive})=> isActive ?"current":""} >Blog</NavLink></li>}
                        <li><NavLink to="/contact" className={({isActive})=> isActive ?"current":""} >Contact</NavLink></li>
                    </ul>
                </div>
                {/* <!-- /.main-menu__nav --> */}
                <div className="main-menu__right">
                    <Link to="#" className="main-menu__toggler mobile-nav__toggler">
                        <i className="fa fa-bars"></i>
                    </Link>
                    <Link to="#" className="main-menu__search search-toggler">
                        <i className="icon-magnifying-glass"></i>
                    </Link>
                    {currentUser.id?
                     <NavDropdown title={<img src={userImage} width='30' height={'30'} className='border-color-primary object-fit-cover border-1 rounded-circle' alt='avatar'/>} id="basic-nav-dropdown">
              <NavDropdown.Item href="/dashboard"><RxDashboard fontSize={'1.2rem'}/> Dashboard</NavDropdown.Item>
              <NavDropdown.Item href="/dashboard/profile">
               <FaUserCog fontSize={'1.2rem'}/> My Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="/dashboard/messenger"><HiOutlineChatBubbleLeftRight fontSize={'1.2rem'}/> Messenger</NavDropdown.Item>
              <NavDropdown.Item href="/dashboard/transaction"><BiTransfer fontSize={'1.2rem'}/> My Transactions</NavDropdown.Item>
              <NavDropdown.Item href="/dashboard/contacts"><FaUserFriends fontSize={'1.2rem'}/> My Contacts</NavDropdown.Item>
              <NavDropdown.Item href="/dashboard/wallets"><IoWalletOutline fontSize={'1.2rem'}/> My Wallet</NavDropdown.Item>
              <NavDropdown.Item href="/dashboard/market"><GiTakeMyMoney fontSize={'1.2rem'}/> Market</NavDropdown.Item>
              <NavDropdown.Item href="/dashboard/profile-settings"><FaCogs fontSize={'1.2rem'}/> Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/logout"><IoLogOutOutline fontSize={'1.2rem'}/>
                Logout
              </NavDropdown.Item>
            </NavDropdown> :  <><Button href="auth/register" className="thm-primary main-menu__btn mx-2" size="sm">Sign Up</Button>
                    <Button href="auth/login" className="thm-primary main-menu__btn mx-2" size="sm">Login</Button></>
                   
           
                } 
                    {/* <!-- /.thm-btn --> */}
                    {
                (((navStyle as Styles) === Styles.STYLE_1) || ((navStyle as Styles) === Styles.STYLE_3)) &&  contact?.map((c:string,i:number)=>(
                 
                 
                <a href={`tel:${c}`} className="main-menu__contact" key={i}>
                        <span className="main-menu__contact__icon">
                            <i className="icon-phone"></i>
                        </span>
                        {/* <!-- /.main-menu__contact__icon --> */}
                        <span className="main-menu__contact__text"><strong>{c}</strong>
                            {activeHours?.slice(0,28)}
                        </span>
                    </a> ))}
                    {/* <!-- /.main-menu__contact --> */}
                </div>
                {/* <!-- /.main-menu__right --> */}
               </>
  )
}

export default React.memo(NavBar)

