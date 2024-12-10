import React from 'react';
import useImportScript from '@hooks/useImportScript';
// import ScriptTag from 'react-script-tag';

const Js = () => {
  const javascript = [
    "dashboard-assets/vendor/global/global.min.js",
    "dashboard-assets/vendor/bootstrap-select/dist/js/bootstrap-select.min.js",
    "dashboard-assets/vendor/chart.js/Chart.bundle.min.js",
    "assets/vendors/jquery/jquery-3.6.0.min.js",
    "dashboard-assetsvendor/peity/jquery.peity.min.js",
    "dashboard-assets/vendor/apexchart/apexchart.js",
    "dashboard-assets/js/dashboard/dashboard-1.js",
    "dashboard-assets/js/custom.js",
    "dashboard-assets/js/deznav-init.js",
  ]	
  return (
    <>
      {
    useImportScript(javascript,'babel')
   
    }
    </>
  )
}

export default React.memo(Js)
