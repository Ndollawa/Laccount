import React from 'react';
import useImportStyle from '@hooks/useImportStyle';
// import ScriptTag from 'react-script-tag';

const Css:React.FC = () => {
  const css:string[] = [
"/assets/vendors/reey-font/stylesheet.css",
"/assets/vendors/animate/animate.min.css",
"/assets/vendors/fontawesome/css/all.min.css",
"/assets/vendors/finlon-icons/style.css",
"/assets/vendors/jarallax/jarallax.css",
"/assets/vendors/jquery-magnific-popup/jquery.magnific-popup.css",
"/assets/vendors/nouislider/nouislider.min.css",
"/assets/vendors/nouislider/nouislider.pips.css",
"/assets/vendors/odometer/odometer.min.css",
"/assets/vendors/swiper/swiper.min.css",
"/assets/css/finlon.css",
]
  return (
    <>
      {
    useImportStyle(css,'css')
   

    }
    </>
  )
}

export default React.memo(Css)
