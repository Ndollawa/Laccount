import React from 'react';
import useImportStyle from '@hooks/useImportStyle';
// import ScriptTag from 'react-script-tag';

const Css:React.FC = () => {
  const css:string[] = [
"/dashboard-assets/css/zenix.css",
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
