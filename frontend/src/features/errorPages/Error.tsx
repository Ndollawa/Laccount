import React from 'react'
import OtherBody from '../dashboard/components/OtherBody'
import { useNavigate } from 'react-router-dom'
import { errorCodes } from '@utils/errorPages'

const Error = ({statusCode}:{statuCode:string}) => {
    const navigate =useNavigate()
    
    const error = errorCodes[statusCode];
  return (
   <OtherBody>
        
        <div className="container h-100">
            <div className="row justify-content-center h-100 align-items-center">
                <div className="col-md-5">
                    <div className="form-input-content text-center error-page">
                        <h1 className="error-text  font-weight-bold">{error.status}</h1>
                        <h4><i className="fa fa-times-circle text-danger"></i> {error.message}</h4>
                        <p>{error.description}</p>
						<div>
                            <button className="btn btn-primary" onClick={()=>navigate(-1)}>Click to go Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </OtherBody>
  )
}

export default React.memo(Error)
