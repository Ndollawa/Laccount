  import React from 'react'
  import PageProps from '../../../../app/props/PageProps'
  import Breadcrum from '../../components/Breadcrum'
  
  
  const TermsConditions:React.FC<PageProps> = ({pageData}:PageProps) => {


    return (
      <>
  <Breadcrum pageData={pageData}/>
  
        
      </>
    )
  }
  


export default React.memo(TermsConditions)
