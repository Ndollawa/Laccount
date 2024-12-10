import React from 'react'
import PageProps from '@props/PageProps'
import Breadcrum from '../../components/Breadcrum'


const PrivacyPolicy:React.FC<PageProps> = ({pageData}:PageProps) => {


  return (
    <>
<Breadcrum pageData={pageData}/>

      
      
    </>
  )
}

export default React.memo(PrivacyPolicy)
