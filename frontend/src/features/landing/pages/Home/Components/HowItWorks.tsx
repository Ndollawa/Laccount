import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCompanyInfo, useLandingConfig, usePages, useSiteImages } from '@dashboard/pages/Settings/slices/settings.slice';
import { GrShieldSecurity } from 'react-icons/gr';


const HowItWorks = () => {
  const {settings:{companyDetails:{siteName}={}}={} }= useSelector(useCompanyInfo);
  return (
    <section className="work-process pt-50 pb-120">
    <div className="work-process__shape-1"></div>
    <div className="work-process__shape-2"></div>
    <div className="work-process__shape-3"></div>

    <div className="container">
        <div className="block-title text-center">
            <p className="block-title__tagline">How To Get Started </p>
            <h2 className="block-title__title">Getting started in 4 simple steps</h2>
        </div>
        <div className="row row-gutter-y-30">
            <div className="col-lg-3 col-md-6 col-sm-12 wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="000ms">
                <div className="work-process__item">
                    <div className="work-process__icon">
                        <i className="icon-select"></i>
                    </div>
                    <h3 className="work-process__title"><a href="/auth/register">Sign Up</a></h3>
                    <p className="work-process__text"> Create your {siteName} account by providing the required information. It only takes a few minutes to complete the registration process.
                    </p>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="100ms">
                <div className="work-process__item">
                    <div className="work-process__icon">
                      <i className="icon icon-settings"></i>
                    </div>
                    <h3 className="work-process__title"><a href="#">Verify Your Account</a></h3>
                    <p className="work-process__text">We prioritize security and require account verification to ensure the authenticity of our users. Follow the simple verification steps to activate your account.
                    </p>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="200ms">
                <div className="work-process__item">
                    <div className="work-process__icon">
                        <i className="icon-bill"></i>
                    </div>
                    <h3 className="work-process__title"><a href="#">Start a Transaction</a></h3>
                    <p className="work-process__text">Once your account is verified, you can Browse or List Accounts as a vendor, browse available accounts in your preferred category or list your own for sale.

                    </p>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="300ms">
                <div className="work-process__item">
                    <div className="work-process__icon">
                        <i className="icon icon-loan"></i>
                    </div>
                    <h3 className="work-process__title"><a href="#">Fund the Wallet & Make a Transaction</a></h3>
                    <p className="work-process__text"> Use our secure payment system to purchase or sell accounts with confidence. Once the transaction is completed, rate your experience and receive your account access instantly.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default React.memo(HowItWorks)