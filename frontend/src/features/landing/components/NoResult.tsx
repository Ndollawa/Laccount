import React from 'react'

const NoResult = () => {
  return (
    <div className="d-flex col-12 justify-content-center align-items-center flex-column">
        <img src='dashboard-assets/images/no-result.png' className='img-responsive' width={400} alt='No Result'/>
        <p className="font-bold my-3">Hey!, No Record Found</p>
    </div>
  )
}

export default NoResult