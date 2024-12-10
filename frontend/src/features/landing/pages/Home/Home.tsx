import React from 'react';
import PageProps from '@props/pageProps';
import { useSelector } from 'react-redux';
import {useCompanyInfo,useLandingConfig} from '@dashboard/pages/Settings/slices/settings.slice';
import Slider from './Components/Slider';
import AboutUs from './Components/AboutUs';
import WhatWeOffer from './Components/WhatWeOffer';
import OurBenefit from './Components/OurBenefit';
import Testimonial from './Components/Testimonial';
import HowItWorks from './Components/HowItWorks';
import CTASection from './Components/CTASection';
import PerformanceMetric from '@landing/components/PerformanceMetric';
import BrandPartners from '@landing/components/BrandPartners';

const Home:React.FC<PageProps>=({pageData}:PageProps) => {

    const {settings:{companyDetails: { siteName }={}}={}} = useSelector(useCompanyInfo); 
    const {settings:{landingPageConfig: { showTestimonial, showWhatWeOffer, showOurBenefit,showPartners, showMetrics}={}}={}} = useSelector(useLandingConfig); 
  return (
    <>
        <Slider/>
        <AboutUs/>
       {showWhatWeOffer && <WhatWeOffer/> }
       
        <HowItWorks/>
        <section className="loan-calculator loan-calculator--has-bg pt-120">
            <div className="container">
                <div className="loan-calculator__top">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="block-title text-left">
                                <p className="block-title__tagline">Why Choose {siteName}:</p>
                                {/* <!-- /.block-title__tagline --> */}
                                <h2 className="block-title__title"> Your Trusted Acount Selling Platform</h2>
                                {/* <!-- /.block-title__title --> */}
                            </div>
                            {/* <!-- /.block-title --> */}
                        </div>
                        {/* <!-- /.col-md-6 --> */}
                        <div className="col-md-6">
                            <p className="loan-calculator__top__text">Choosing {siteName} as your trusted Social Account escrow partner comes with a range of benefits. We prioritize transparency, reliability, and customer satisfaction to deliver an exceptional experience to our users. Here's why you should choose {siteName}:</p>
                                {/* <!-- /.loan-calculator__top__text --> */}
                        </div>
                        {/* <!-- /.col-md-6 --> */}
                    </div>
                    {/* <!-- /.row --> */}
                </div>
                {/* <!-- /.loan-calculator__top --> */}

                <div className="loan-calculator__box">
                    <div className="row row-gutter-x-0">
                        <div className="col-lg-6">
                        <div className="row row-gutter-y-20 gap-3">
                      <div className="col-md-12">
                          <div className="about-four__feature">
                              <div className="about-four__feature__content">
                                  <div className="about-four__feature__icon">
                                      <i className="icon-confirmation"></i>
                                  </div>
                                  <h4 className="about-four__feature__title fs-16">Security</h4>
                                  
                              </div>
                              <div className="about-four__feature__text text-justify px-4">We use advanced encryption and authentication to keep your funds and personal information safe.
                              </div>
                          </div>
                      </div>
                      <div className="col-md-12">
                          <div className="about-four__feature">
                              <div className="about-four__feature__content">
                                  <div className="about-four__feature__icon">
                                      <i className="icon-confirmation"></i>
                                  </div>
                                  <h4 className="about-four__feature__title fs-16 flex-no-wrap">Dispute Resolution</h4>
                                  
                              </div>
                              <div className="about-four__feature__text  text-justify px-4"> Our experienced team provides fair, impartial dispute resolution to ensure trust and confidence.
                              </div>
                          </div>
                      </div>
                      <div className="col-md-12">
                          <div className="about-four__feature">
                              <div className="about-four__feature__content">
                                  <div className="about-four__feature__icon">
                                      <i className="icon-confirmation"></i>
                                  </div>
                                  <h4 className="about-four__feature__title fs-16 flex-no-wrap">User-Friendly Interface</h4>
                                  
                              </div>
                              <div className="about-four__feature__text  text-justify px-4">A straightforward, intuitive layout makes navigating and managing transactions easy for both buyers and sellers.
                              </div>
                          </div>
                      </div>
                      <div className="col-md-12">
                          <div className="about-four__feature">
                              <div className="about-four__feature__content">
                                  <div className="about-four__feature__icon">
                                      <i className="icon-confirmation"></i>
                                  </div>
                                  <h4 className="about-four__feature__title fs-16 flex-no-wrap">Dedicated Support</h4>
                                  
                              </div>
                              <div className="about-four__feature__text  text-justify px-4">Knowledgeable support staff are available to assist with any questions or issues you encounter.
                              </div>
                          </div>
                      </div>
                     
                      <div className="col-md-12">
                          <div className="about-four__feature">
                              <div className="about-four__feature__content">
                                  <div className="about-four__feature__icon">
                                      <i className="icon-confirmation"></i>
                                  </div>
                                  <h4 className="about-four__feature__title fs-16 flex-no-wrap">Buyer and Seller Protection</h4>
                                  
                              </div>
                              <div className="about-four__feature__text  text-justify px-4">Funds are securely held until buyers receive their goods or services, ensuring fair transactions for both parties.
                              </div>
                          </div>
                      </div>
                  </div>
                
                        </div>
                        {/* <!-- /.col-lg-6 --> */}
                        <div className="col-lg-6">
                            <div className="loan-calculator__image">
                                <img src="assets/images/resources/loan-calculator-1-1.png" alt="" />
                                <div className="loan-calculator__image__caption wow fadeInUp" data-wow-duration="1500ms">
                                    <div className="loan-calculator__image__caption__inner">
                                        <h3 className="loan-calculator__image__title">98<span>%</span></h3>
                                        
                                        {/* <!-- /.loan-calculator__image__title --> */}
                                        <p className="loan-calculator__image__text">Satisfied Customers</p>
                                    </div>
                                    {/* <!-- /.loan-calculator__image__caption__inner --> */}
                                </div>
                                {/* <!-- /.loan-calculator__image__caption --> */}
                            </div>
                            {/* <!-- /.loan-calculator__image --> */}
                        </div>
                        {/* <!-- /.col-lg-6 --> */}
                    </div>
                    {/* <!-- /.row --> */}
                </div>
                {/* <!-- /.loan-calculator__box --> */}
            </div>
            {/* <!-- /.container --> */}
        </section>
        {/* <!-- /.loan-calculator --> */}
       {showTestimonial && <Testimonial/> }
        {/* <!-- /.testimonials-one --> */}
       
       {showMetrics && <PerformanceMetric/> }
        {/* <!-- /.fact-one --> */}
       {showOurBenefit && <OurBenefit/> }
        {/* <!-- /.benefit-one --> */}

       {showPartners && <BrandPartners/> }

       
        {/* <!-- /.blog-one --> */}
<CTASection/>
    </>
  )
}

export default React.memo(Home)
