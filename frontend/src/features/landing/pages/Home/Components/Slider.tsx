import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLandingConfig } from '../../../../dashboard/pages/Settings/slices/settings.slice';
import OwlCarousel from 'react-owl-carousel'; // Importing OwlCarousel from react-owl-carousel
import 'owl.carousel/dist/assets/owl.carousel.css'; // OwlCarousel CSS
import 'owl.carousel/dist/assets/owl.theme.default.css'; // OwlCarousel default theme CSS

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Slider = () => {
  const { settings: { landingPageConfig: { sliderStyle } = {} , sliders =[]} = {} } = useSelector(useLandingConfig);

  // OwlCarousel options
  const carouselOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 7000,
    smartSpeed: 500,
    items: 1,
    lazyLoad:true,
    lazyContent:true,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    nav: true,
    dots: false,
    navContainer: true
    navElement: 'div',
    navText: ['<button className="slider-one__carousel__btn__left"> <i className="fa fa-angle-left"></i> </button>', '<button className="slider-one__carousel__btn__right"> <i className="fa fa-angle-right"></i> </button>']
  };

  let slider: any = null;

  if (sliders) {


    switch (sliderStyle) {
      case 1:
        slider = (
          <section className="slider-one">
            {/* Using OwlCarousel component */}
            <OwlCarousel className="owl-theme" {...carouselOptions}>
              {sliders?.map((slide: any) => (
                <div className="item" key={slide.id}>
                  <div className="slider-one__item">
                    <div className="slider-one__lines">
                      <span></span><span></span><span></span><span></span><span></span>
                    </div>
                    <div
                      className="slider-one__image"
                      style={{ backgroundImage: `url(${BASE_URL + "uploads/settings/slides/" + slide.image})` }}>
                    </div>
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-7">
                          <p className="slider-one__tagline"><i className="fa fa-chart-pie"></i> {slide.title}</p>
                          <h2 className="slider-one__title">{slide.description}</h2>
                          <p className="slider-one__text">{slide?.body?.replaceAll(/<\/?[^>]+(>|$)/gi, "")}</p>
                          <div className="slider-one__btns">
                           {(slide.cto.link && slide.cto.cto_text) && <Link to={slide?.cto?.link} className="thm-btn">{slide?.cto?.cot_text}</Link>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slider-one__carousel__btn nav-container">  </div>
                  </div>
              ))}
            </OwlCarousel>

            <div className="slider-one__box wow fadeInRight" data-wow-duration="1500ms">
              <div className="slider-one__box__icon">
                <i className="icon-successful"></i>
              </div>
              <div className="slider-one__box__content">
                <p className="slider-one__box__tagline">Checkout our</p>
                <h3 className="slider-one__box__title">88% Success Rates</h3>
              </div>
            </div>
          </section>
        );
        break;

      case 2:
        slider = (
          <section className="slider-one slider-one--two">
            <OwlCarousel className="owl-theme" {...carouselOptions}>
              {sliders?.map((slide: any) => (
                <div className="item" key={slide.id}>
                  <div className="slider-one__item">
                    <div className="slider-one__image" style={{ backgroundImage: `url(${BASE_URL + "uploads/settings/slides/" + slide.image})` }}>
                    </div>
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-6">
                          <p className="slider-one__tagline"> {slide.title}</p>
                          <h2 className="slider-one__title">{slide.description}</h2>
                          <p className="slider-one__text">{slide?.body?.replaceAll(/<\/?[^>]+(>|$)/gi, "")}</p>
                          <div className="slider-one__btns">
                          {(slide.cto.link && slide.cto.cto_text) &&  <Link to={slide?.cto?.link} className="thm-btn thm-btn--dark-hover">{slide?.cto?.cto_text}</Link>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slider-one__carousel__btn nav-container">  </div> 
                </div>
              ))}
            </OwlCarousel>
          </section>
        );
        break;

      case 3:
        slider = (
          <section className="slider-one slider-one--three">
            <OwlCarousel className="owl-theme" {...carouselOptions}>
              {sliders?.map((slide: any) => (
                <div className="item" key={slide.id}>
                  <div className="slider-one__item">
                    <div className="slider-one__image" style={{ backgroundImage: `url(${BASE_URL + "uploads/settings/slides/" + slide.image})` }}>
                    </div>
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12 text-center">
                          <h2 className="slider-one__title">{slide.description}</h2>
                          <p className="slider-one__text">{slide?.body?.replaceAll(/<\/?[^>]+(>|$)/gi, "")}</p>
                          <div className="slider-one__btns">
                          {(slide.cto.link && slide.cto.cto_text) &&    <Link to={slide?.cto?.link} className="thm-btn">{slide.cto.cto_text}</Link>}
                          </div>
                        </div>
                      </div>
                      </div>
                  </div>
                  <div className="slider-one__carousel__btn nav-container">  </div>
                     </div>
              ))}
            </OwlCarousel>
          </section>
        );
        break;

      default:
        slider = null;
        break;
    }
  }

  return <>{slider}</>;
};

export default React.memo(Slider);
