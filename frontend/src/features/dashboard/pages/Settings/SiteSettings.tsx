import React
,{useEffect} from 'react';
import MainBody from '../../components/MainBody';
import { Link, NavLink ,Outlet} from 'react-router-dom';
// import $ from 'jquery';

const SiteSettings = () => {
    // const handleLinkColor  = (e:any) =>{
    //     // alert('clicked')
    //     // e.preventDefault()
    //     e.currentTarget.parentElement?.addClass('setting active')
        
    // //    console.log(e.currentTarget.parentElement) 
    // }
 
  return (
    <MainBody>
    <div className="container-fluid">
    <div className="row jumbotron"> 
            <div className='col-md-3 col-sm-12'>
                <div className="card h-auto">
                    <div className="card-header">
                        <h4 className="card-title">Settings</h4>
                    </div>
                    <div className="card-body">
                        <div className="basic-list-group">
                            <div className="setting-nav-wrapper d-flex flex-column">
                                <NavLink className={({isActive})=> isActive?`active ` : ""}  to="/dashboard/settings/general">General Setttings</NavLink>
                                <NavLink className={({isActive})=> isActive?`active ` : ""} to="/dashboard/settings/home-page">Home Page</NavLink>
                                <NavLink className={({isActive})=> isActive?`active ` : ""} to="/dashboard/settings/about-us">About Us</NavLink>
                                <NavLink className={({isActive})=> isActive?`active ` : ""} to="/dashboard/settings/privacy-and-policy">Privacy and Policy</NavLink>
                                <NavLink className={({isActive})=> isActive?`active ` : ""} to="/dashboard/settings/terms-and-conditions">Terms and Conditions</NavLink>
                                {/* <NavLink className="setting-nav" to="/dashboard/settings/our-gallery">Our Gallery</NavLink> */}
                                <NavLink className={({isActive})=> isActive?`active ` : ""} end to="/dashboard/settings/site-images">Site Images</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <div className="col-md-9"> 
        <Outlet/>
         </div>
        </div>
    </div>
</MainBody>
  )
}

export default React.memo(SiteSettings)