  import React from 'react'
  import PageProps from '@props/pageProps'
  import Breadcrum from '@landing/components/Breadcrum'
  
  
  const TermsConditions:React.FC<PageProps> = ({pageData}:PageProps) => {


    return (
      <>
  <Breadcrum pageData={pageData}/>
  
        
      </>
    )
  }
  


export default React.memo(TermsConditions)
