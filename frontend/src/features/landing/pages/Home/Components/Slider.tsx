import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLandingConfig } from '../../../../dashboard/pages/Settings/slices/settings.slice';
import OwlCarousel from 'react-owl-carousel'; // Importing OwlCarousel from react-owl-carousel
import 'owl.carousel/dist/assets/owl.carousel.css'; // OwlCarousel CSS
import 'owl.carousel/dist/assets/owl.theme.default.css'; // OwlCarousel default theme CSS

const SLIDER_ASSETS = import.meta.env.VITE_SLIDER_ASSETS;

const Slider = () => {
  const {
    settings: { landingPageConfig: { sliderStyle } = {}, sliders = [] } = {},
  } = useSelector(useLandingConfig);

  const handleSlideHeading = (phrase: string): string => {
    if (!phrase) return '';
    const words = phrase.trim().split(' ');
    const lastWord = words.pop();
    return words.length > 0 ? `${words.join(' ')} <span>${lastWord}</span>` : `<span>${lastWord}</span>`;
  };

  const renderSlide = (slide: any) => (
    <div className="item" key={slide.id}>
      <div className="slider-one__item">
        <div
          className="slider-one__image"
          style={{ backgroundImage: `url(${SLIDER_ASSETS}${slide.image})` }}
        />
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <p className="slider-one__tagline">
                <i className="fa fa-chart-pie"></i> {slide.title}
              </p>
              <h2 className="slider-one__title" dangerouslySetInnerHTML={{ __html: handleSlideHeading(slide.description) }} />
              <p className="slider-one__text">{slide?.body?.replace(/<\/?[^>]+(>|$)/gi, '')}</p>
              {slide?.cto?.link && slide?.cto?.cto_text && (
                <div className="slider-one__btns">
                  <Link to={slide.cto.link} className="thm-btn">
                    {slide.cto.cto_text}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="slider-one__carousel__btn nav-container"></div>
    </div>
  );

  const carouselOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 7000,
    smartSpeed: 500,
    items: 1,
    lazyLoad: true,
    lazyContent: true,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    nav: true,
    dots: false,
    // navContainer: true,
    // navElement: 'div',
    navText: [
      '<button className="slider-one__carousel__btn__left"><i className="fa fa-angle-left"></i></button>',
      '<button className="slider-one__carousel__btn__right"><i className="fa fa-angle-right"></i></button>',
    ],
  };

  const sliderStyles: Record<number, JSX.Element | null> = {
    1: (
      <section className="slider-one">
        <OwlCarousel className="owl-theme" {...carouselOptions}>
          {sliders.map(renderSlide)}
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
    ),
    2: (
      <section className="slider-one slider-one--two">
        <OwlCarousel className="owl-theme" {...carouselOptions}>
          {sliders.map(renderSlide)}
        </OwlCarousel>
      </section>
    ),
    3: (
      <section className="slider-one slider-one--three">
        <OwlCarousel className="owl-theme" {...carouselOptions}>
          {sliders.map(renderSlide)}
        </OwlCarousel>
      </section>
    ),
  };

  // If the sliderStyle is not 1, 2, or 3, return null (or any default style)
  return <>{sliderStyles[sliderStyle!] || null}</>;
};

export default React.memo(Slider);
