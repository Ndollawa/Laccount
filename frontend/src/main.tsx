import React from 'react';
import ReactDOM from 'react-dom/client';
import {disableReactDevTools} from '@fvilers/disable-react-devtools'
import { BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import {persistStore} from 'redux-persist';
import { Provider } from 'react-redux';
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { HelmetProvider } from 'react-helmet-async';
import { store } from '@store/store';
import App from './App';
import OtherBody from '@dashboard/components/OtherBody';
import GeneralPreloader from '@components/preloader/GeneralPreloader';

const NODE_ENV = import.meta.env.NODE_ENV;
if(NODE_ENV === 'production') disableReactDevTools();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
function Fallback({ error, resetErrorBoundary }:FallbackProps) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.
console.error(error);
  return (
    <>
    <OtherBody>
   <div className="w-100 row justify-content-center h-100 align-items-center">
       <div className="row justify-content-center h-100 align-items-center">
           <div className="col-md-7">
               <div className="form-input-content text-center error-page">
                   <h1 className="error-text font-weight-bold">400</h1>
                   <h4><i className="fa fa-thumbs-down text-danger"></i> Your request resulted in an error</h4>
                
                   <p>Reload the page to continue. If this still continues, please contact out support team</p>
       <div>
                       <button className="btn btn-primary" onClick={()=>resetErrorBoundary()} >Click to go Back</button>
                   </div>
               </div>
           </div>
       </div>
   </div>
   </OtherBody>
   </>
  );
}


const persistor = persistStore(store)
root.render(
  <React.StrictMode>
      
    <Provider  store={store} >
      <PersistGate loading={<GeneralPreloader/>} persistor={persistor}>
      <ErrorBoundary FallbackComponent={Fallback} onError={(error)=>console.log(error)}>
          <React.Suspense fallback={<GeneralPreloader/>}>
              <HelmetProvider>  
              <Router>
                <Routes>
                  <Route path="/*" element={ <App />} />
                </Routes>
              </Router>
           </HelmetProvider>
</React.Suspense>
</ErrorBoundary>
    </PersistGate>
</Provider>
  </React.StrictMode>
);

