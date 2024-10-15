import React from 'react';
import PageProps from '../../../../app/props/PageProps';
import { useSelector } from 'react-redux';
import {useCompanyInfo,useLandingConfig} from '../../../dashboard/pages/Settings/slices/settings.slice';
import Slider from './Components/Slider';
import AboutUs from './Components/AboutUs';
import WhatWeOffer from './Components/WhatWeOffer';
import OurBenefit from './Components/OurBenefit';
import Testimonial from './Components/Testimonial';
import HowItWorks from './Components/HowItWorks';
import CTASection from './Components/CTASection';
import PerformanceMetric from '../../components/PerformanceMetric';
import BrandPartners from '../../components/BrandPartners';

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
                            <p className="loan-calculator__top__text">Choosing {siteName} as your trusted Account escrow partner comes with a range of benefits. We prioritize transparency, reliability, and customer satisfaction to deliver an exceptional experience to our users. Here's why you should choose {siteName}:</p>
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
                              <div className="about-four__feature__text text-justify px-4 py-2">We employ advanced security measures to protect your funds and personal information. Our platform is designed with robust encryption and authentication protocols to ensure a secure environment for your transactions.
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
                              <div className="about-four__feature__text  text-justify px-4 py-2">In the unlikely event of a dispute, our experienced team provides fair and impartial resolution services. We work diligently to find a satisfactory outcome for all parties involved, fostering trust and confidence in the process.
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
                              <div className="about-four__feature__text  text-justify px-4 py-2">Our intuitive and user-friendly interface makes it easy for both buyers and sellers to navigate the platform. With clear instructions and a straightforward layout, you can quickly initiate and manage your transactions with ease.
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
                              <div className="about-four__feature__text  text-justify px-4 py-2">We have a dedicated customer support team available to assist you every step of the way. Whether you have questions, need guidance, or encounter any issues, our knowledgeable representatives are here to provide timely and helpful assistance.
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
                              <div className="about-four__feature__text  text-justify px-4 py-2">We prioritize the safety and satisfaction of both buyers and sellers. By using {siteName}, buyers can be confident that their funds are protected until they receive the goods or services they paid for. Sellers, on the other hand, can rest assured that they will be paid promptly once the buyer's requirements are met.
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
