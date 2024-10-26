import React, { useState, useMemo, useEffect, useTransition } from 'react';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { selectCurrentToken } from './features/auth/slices/auth.slice';
import DashboardLayout from './features/layouts/dashboard/Layout';
import LandingLayout from './features/layouts/landing/Layout';
import { useLandingConfig } from './features/dashboard/pages/Settings/slices/settings.slice';

// Lazy Load components
const StripeElement = React.lazy(() => import('./features/dashboard/components/StripeElement'));
const PaymentStatus = React.lazy(() => import('./features/dashboard/components/PaymentStatus'));

const PersistLogin = React.lazy(() => import('./features/components/PersistLogin'));
const RequireAuth = React.lazy(() => import('./features/components/RequireAuth'));
const Wallet = React.lazy(() => import('./features/dashboard/pages/Wallet/Wallet'));
const Market = React.lazy(() => import('./features/dashboard/pages/Market/Market'));
const Transaction = React.lazy(() => import('./features/dashboard/pages/Transaction/Transaction'));
const Chat = React.lazy(() => import('./features/dashboard/pages/Messenger/Chat'));
const Users = React.lazy(() => import('./features/dashboard/pages/Users/Users'));
const User = React.lazy(() => import('./features/dashboard/pages/Users/User'));
const Contacts = React.lazy(() => import('./features/dashboard/pages/Contact/Contacts'));
// const CoinDetail = React.lazy(() => import('./features/dashboard/pages/CoinDetail'));
const DashboardHome = React.lazy(() => import('./features/dashboard/pages/Home/HomePage'));
const Profile = React.lazy(() => import('./features/dashboard/pages/Profile/Profile'));
const ProfileEdit = React.lazy(() => import('./features/dashboard/pages/Profile/ProfileEdit'));
const DashboardFaq = React.lazy(() => import('./features/dashboard/pages/Faq/Faq'));
const DashboardTeam = React.lazy(() => import('./features/dashboard/pages/Team/Team'));
const DashboardService = React.lazy(() => import('./features/dashboard/pages/Service/Services'));
const DashboardSlider = React.lazy(() => import('./features/dashboard/pages/Slide/Slide'));

// settings
const SiteSettings = React.lazy(() => import('./features/dashboard/pages/Settings/SiteSettings'));
const GeneralSettings = React.lazy(() => import('./features/dashboard/pages/Settings/components/GeneralSettings'));
const HomePageSettings = React.lazy(() => import('./features/dashboard/pages/Settings/components/HomePageSettings'));
const AboutUs = React.lazy(() => import('./features/dashboard/pages/Settings/components/AboutUs'));
const TermsConditionsSetting = React.lazy(() => import('./features/dashboard/pages/Settings/components/TermsConditions'));
const PrivacyPolicySetting = React.lazy(() => import('./features/dashboard/pages/Settings/components/PrivacyPolicy'));
const SiteImage = React.lazy(() => import('./features/dashboard/pages/Settings/components/SiteImage'));


const LandingHome = React.lazy(() => import('./features/landing/pages/Home/Home'));
const About = React.lazy(() => import('./features/landing/pages/About/About'));
const Blog = React.lazy(() => import('./features/landing/pages/Blog/Blog'));
const Post = React.lazy(() => import('./features/landing/pages/Blog/Post/Post'));
const Career = React.lazy(() => import('./features/landing/pages/Careers/Career'));
const Form = React.lazy(() => import('./features/landing/pages/Careers/Form'));
const Contact = React.lazy(() => import('./features/landing/pages/Contact/Contact'));
const Faq = React.lazy(() => import('./features/landing/pages/FAQ/Faq'));
const Services = React.lazy(() => import('./features/landing/pages/Services/Services'));
const Service = React.lazy(() => import('./features/landing/pages/Services/Detail/Service'));
const Team = React.lazy(() => import('./features/landing/pages/Team/Team'));
const Member = React.lazy(() => import('./features/landing/pages/Team/Detail/Member'));
const TermsConditions = React.lazy(() => import('./features/landing/pages/Terms-Conditions/TermsConditions'));
const PrivacyPolicy = React.lazy(() => import('./features/landing/pages/Privacy-Policy/PrivacyPolicy'));
const Login = React.lazy(() => import('./features/auth/Login'));
const Register = React.lazy(() => import('./features/auth/Register'));

// Error pages
const Error400 = React.lazy(() => import( './features/errorPages/Error400'));
const Error401 = React.lazy(() => import( './features/errorPages/Error401'));
const Error403 = React.lazy(() => import( './features/errorPages/Error403'));
const Error404 = React.lazy(() => import( './features/errorPages/Error404'));
const Error500 = React.lazy(() => import( './features/errorPages/Error500'));
const Error503 = React.lazy(() => import( './features/errorPages/Error503'));
 const BRAND_ASSETS = import.meta.env.VITE_BRAND_ASSETS;

const Preloader = ()=>{
  return (
    <div id="preloader" >
            <div className="sk-three-bounce">
                <div className="sk-child sk-bounce1"></div>
                <div className="sk-child sk-bounce2"></div>
                <div className="sk-child sk-bounce3"></div>
            </div>
        </div>
  )
}

const App = () => {
  // const [pageTitle, setPageTitle] = useState("Home");
  const location = useLocation();
  const currentToken = useSelector(selectCurrentToken);
  const { settings: { landingPageConfig: { showBlog, showTeam } = {}, siteImages: {pagesBg}={} } = {} } = useSelector(useLandingConfig);
const bgImage = `${BRAND_ASSETS}${pagesBg}`

  const [isPending, startTransition] = useTransition();

  // useEffect(() => {
  //   startTransition(() => {
  //     setPageTitle("Home");
  //   });
  // }, [location]);

  const errorRoutes = useMemo(() => (
    <>
      <Route path="error" element={<DashboardLayout pageData={{ pageTitle: "Dashboard" }} />}>
        <Route index element={<Error404 />} />
        <Route path="400" element={<Error400 />} />
        <Route path="401" element={<Error401 />} />
        <Route path="403" element={<Error403 />} />
        <Route path="404" element={<Error404 />} />
        <Route path="500" element={<Error500 />} />
        <Route path="503" element={<Error503 />} />
      </Route>
    </>
  ), []);

  const protectedRoutes = useMemo(() => (
    <>
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={["0000", "0002", "0003"]} />}>
          <Route path="/dashboard" element={<DashboardLayout pageData={{ pageTitle: "Dashboard" }} />}>
            <Route index element={<DashboardHome />} />
            <Route path="profile">
              <Route index element={<Profile pageData={{ pageTitle:"Profile", coverImage:bgImage }}/>} />
              <Route path="edit" element={<ProfileEdit />} />
            </Route>
            <Route path="wallets" element={<Wallet pageData={{ pageTitle: "Wallet", coverImage:bgImage }} />} />
            <Route path="market" element={<Market pageData={{ pageTitle: "Market", coverImage:bgImage }} />} />
            <Route path="transaction" element={<Transaction pageData={{ pageTitle: "Transaction", coverImage:bgImage }} />} />
            <Route path="contacts" element={<Contacts pageData={{ pageTitle: "Contacts", coverImage:bgImage }} />} />
           
            <Route path="messenger">
              <Route index element={<Chat pageData={{ pageTitle: "Messenger", coverImage:bgImage }} />} />
              <Route path=":id" element={<Chat pageData={{ pageTitle: "Messenger", coverImage:bgImage }} />} />
            </Route>
            {/* <Route path="coin-Detail/:id" element={<CoinDetail pageData={{ pageTitle: "Coin Data", coverImage:bgImage }} />} /> */}
          </Route>
          {/* Admin Routes */}
          <Route element={<RequireAuth allowedRoles={["0001", "0000"]} />} />
            <Route path="faq" element={<DashboardFaq />} />
            <Route path="our-team" element={<DashboardTeam />} />
            <Route path="services" element={<DashboardService />} />
            <Route path="sliders" element={<DashboardSlider />} />
           <Route path="users">
              <Route index element={<Users pageData={{ pageTitle: "Users", coverImage:bgImage }} />} />
              <Route path="user/:userId" element={<User pageData={{ pageTitle: "User", coverImage:bgImage }} />} />
            </Route>
           <Route path="blog">
              <Route index element={<Users pageData={{ pageTitle: "Posts", coverImage:bgImage }} />} />
              <Route path="posts"  >
                     <Route index element={<Users pageData={{ pageTitle: "Users", coverImage:bgImage }} />} />
                     <Route path=":postId" element={<User pageData={{ pageTitle: "User", coverImage:bgImage }} />} />
              </Route>
            </Route>
          <Route path="dashboard/settings/" element={<SiteSettings pageData={{ pageTitle:"Settings", coverImage:bgImage }}/>} >
                      <Route index element={<GeneralSettings/>} />
                      <Route path="general" element={<GeneralSettings/>} />
                      <Route path="home-page" element={<HomePageSettings/>} />
                      <Route path="about-us" element={<AboutUs/>} />
                      <Route path="privacy-and-policy" element={<PrivacyPolicySetting/>} />
                      <Route path="contact-us" element={<SiteSettings/>} />
                      <Route path="site-images" element={<SiteImage/>} />
                      <Route path="terms-and-conditions" element={<TermsConditionsSetting/>} />
                  </Route> 
        </Route>
      </Route>
    </>
  ), []);

  return (
    <>
      <ToastContainer />
      {isPending ? <Preloader /> :
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingLayout pageData={{ pageTitle:"Home", coverImage:bgImage }}/> }>
          <Route index element={<LandingHome />} />
          <Route path="about" element={<About pageData={{ pageTitle:"About", coverImage:bgImage }} />} />
          <Route path="contact" element={<Contact pageData={{ pageTitle:"Contact", coverImage:bgImage }}/>} />
          <Route path="careers" element={<Career pageData={{ pageTitle:"Career", coverImage:bgImage }} />} />
          <Route path="career/apply-now" element={<Form />} />
          <Route path="faqs" element={<Faq pageData={{ pageTitle:"Faq", coverImage:bgImage }}/>} />
          <Route path="terms-and-condition" element={<TermsConditions pageData={{ pageTitle:"Terms & Conditions", coverImage:bgImage }} />} />
          <Route path="our-blog">
            <Route index element={showBlog ? <Blog pageData={{ pageTitle:"Our Blog", coverImage:bgImage }}/> : <Navigate to="/error/404" />} />
            <Route path="posts/:id" element={showBlog ? <Post /> : <Navigate to="/error/404" />} />
          </Route>
          <Route path="privacy-and-policy" element={<PrivacyPolicy pageData={{ pageTitle:"Our Privacy Policy", coverImage:bgImage }} />} />
          <Route path="our-team">
            <Route index element={showTeam ? <Team  pageData={{ pageTitle:"Team", coverImage:bgImage }}/> : <Navigate to="/error/404" />} />
            <Route path=":id" element={showTeam ? <Member /> : <Navigate to="/error/404" />} />
          </Route>
          <Route path="services">
            <Route index element={<Services pageData={{ pageTitle:"Services", coverImage:bgImage }}/>} />
            <Route path=":id" element={<Service />} />
          </Route>
          <Route path="login" element={<Navigate to="/auth/login" replace />} />
          <Route path="register" element={<Navigate to="/auth/register" />} />
         
        </Route>
         <Route path="payment-status" element={<DashboardLayout pageData={{ pageTitle: "Dashboard" }} />}>
          <Route index element={<StripeElement><PaymentStatus /></StripeElement>} />
         </Route>
         <Route path="auth" element={<DashboardLayout pageData={{ pageTitle: "Dashboard" }} />}>
          <Route index element={currentToken ? <Navigate state={{ from: location }} to="/dashboard" /> : <Login />} />
          <Route path="login" element={currentToken ? <Navigate state={{ from: location }} to="/dashboard" /> : <Login />} />
          <Route path="register" element={currentToken ? <Navigate state={{ from: location }} to="/dashboard" /> : <Register />} />
          </Route>
        {/* </React.Suspense> */}

      {/* <React.Suspense fallback={<Preloader/>} > */}
        {/* Protected Routes */}
        {protectedRoutes}
        {errorRoutes}

        {/* Error Route */}
        <Route path="*" element={<Navigate to="error/404" />} />
      </Routes>
       }
    </>
  );
};

export default React.memo(App);
