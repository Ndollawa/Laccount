import React from 'react';
// import { useSelector } from 'react-redux';
// import { useIsLoading } from './slices/preloader.slice';

const Preloader = () => {
  // const isLoading = useSelector(useIsLoading); style={isLoading? undefined:{display:"none"} }
  return (
    <div id="preloader">
    <div className="sk-three-bounce">
        <div className="sk-child sk-bounce1"></div>
        <div className="sk-child sk-bounce2"></div>
        <div className="sk-child sk-bounce3"></div>
    </div>
</div>
  )
}

export default React.memo(Preloader)