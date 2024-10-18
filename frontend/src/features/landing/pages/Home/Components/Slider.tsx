import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLandingConfig } from '../../../../dashboard/pages/Settings/slices/settings.slice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade, Virtual } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Slider = () => {
  const { settings: { landingPageConfig: { sliderStyle } = {} , sliders =[]} = {} } = useSelector(useLandingConfig);

  const handleSlideHeading = (phrase: string) => {
    let res = '';
    if (phrase) {
      const words = phrase.trim().split(' ');
      const lastWord = words.pop();
      res = words.length > 0 ? `${words.join(' ')} <span>${lastWord}</span>` : `<span>${lastWord}</span>`;
    }
    return res;
  };

  const swiperOptions = {
    modules: [Navigation, Pagination, Autoplay, EffectFade, Virtual],
    loop: true,
    autoplay: { delay: 7000 },
    effect: 'fade',
    speed: 500,
    slidesPerView: 1,
    pagination: { clickable: true },
    navigation: true,
    lazy: true,
  };

  let slider: any = null;

  if (sliders) {
    switch (sliderStyle) {
      case 1:
        slider = (
          <section className="slider-one">
            <Swiper {...swiperOptions}>
              {sliders.map((slide: any) => (
                <SwiperSlide key={slide.id}>
                  <div className="slider-one__item">
                    <div className="slider-one__lines">
                      <span></span><span></span><span></span><span></span><span></span>
                    </div>
                    <div
                      className="slider-one__image"
                      style={{ backgroundImage: `url(${BASE_URL}uploads/settings/slides/${slide.image})` }}
                    ></div>
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-7">
                          <p className="slider-one__tagline"><i className="fa fa-chart-pie"></i> {slide.title}</p>
                          <h2
                            className="slider-one__title"
                            dangerouslySetInnerHTML={{ __html: handleSlideHeading(slide.description) }}
                          ></h2>
                          <p className="slider-one__text">{slide?.body?.replaceAll(/<\/?[^>]+(>|$)/gi, "")}</p>
                          <div className="slider-one__btns">
                            {(slide.cto.link && slide.cto.cto_text) && <Link to={slide.cto.link} className="thm-btn">{slide.cto.cto_text}</Link>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

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
            <Swiper {...swiperOptions}>
              {sliders.map((slide: any) => (
                <SwiperSlide key={slide.id}>
                  <div className="slider-one__item">
                    <div className="slider-one__image" style={{ backgroundImage: `url(${BASE_URL}uploads/settings/slides/${slide.image})` }}></div>
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-6">
                          <p className="slider-one__tagline">{slide.title}</p>
                          <h2
                            className="slider-one__title"
                            dangerouslySetInnerHTML={{ __html: handleSlideHeading(slide.description) }}
                          ></h2>
                          <p className="slider-one__text">{slide?.body?.replaceAll(/<\/?[^>]+(>|$)/gi, "")}</p>
                          <div className="slider-one__btns">
                            {(slide.cto.link && slide.cto.cto_text) && <Link to={slide.cto.link} className="thm-btn thm-btn--dark-hover">{slide.cto.cto_text}</Link>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        );
        break;

      case 3:
        slider = (
          <section className="slider-one slider-one--three">
            <Swiper {...swiperOptions}>
              {sliders.map((slide: any) => (
                <SwiperSlide key={slide.id}>
                  <div className="slider-one__item">
                    <div className="slider-one__image" style={{ backgroundImage: `url(${BASE_URL}uploads/settings/slides/${slide.image})` }}></div>
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12 text-center">
                          <h2
                            className="slider-one__title"
                            dangerouslySetInnerHTML={{ __html: handleSlideHeading(slide.description) }}
                          ></h2>
                          <p className="slider-one__text">{slide?.body?.replaceAll(/<\/?[^>]+(>|$)/gi, "")}</p>
                          <div className="slider-one__btns">
                            {(slide.cto.link && slide.cto.cto_text) && <Link to={slide.cto.link} className="thm-btn">{slide.cto.cto_text}</Link>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
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
