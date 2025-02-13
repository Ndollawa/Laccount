import React from 'react'
import { NavLink, useParams,useNavigate } from 'react-router-dom'
import { useGetServicesQuery } from '@dashboard/pages/Service/slices/servicesApi.slice'
import PageProps from '@props/PageProps'
import Breadcrum from '@landing/components/Breadcrum'
import ServiceProps from '@props/serviceProps'
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Service = ({pageData}:PageProps)  => {
const {id} = useParams()
const navigate = useNavigate()
   const { service } = useGetServicesQuery("servicesList", {
            selectFromResult: ({ data }) => ({
              service: id && data?.entities[id]		 
            }),
            }) 
            if(!service) navigate('/error/404')
            
//    const { services } = useGetServicesQuery("servicesList", {
//             selectFromResult: ({ data }) => ({
//               services: data?.ids?.map((id:string)=>data?.entities[id])		 
//             }),
//             }) 
    const {
  data,
  isLoading,
  isSuccess,
  isError,
  error
} = useGetServicesQuery('servicesList', {
  pollingInterval: 15000,
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true
})
let allServices;
if(data.entities){
    const {ids,entities} = data
     allServices = (Object.values(entities)as ServiceProps[])?.map(service=> <li key={service?.id}><NavLink className={({isActive})=> isActive ?"active":''} to={`/services/service/${service?.id}`}>{service.title}</NavLink></li>)
}
    return (
      <>
  <Breadcrum pageData={{pageTitle:service?.title}}/>

{/* <!-- /.page-header --> */}
<section className="service-details pt-120 pb-120">
    <div className="container">
        <div className="row row-gutter-y-30">
            <div className="col-lg-4">
                <div className="widget-area service-sidebar">
                    <div className="widget blog-sidebar__box service-sidebar__item service-sidebar__item--menu">
                        <ul className="service-sidebar__menu">
                            {
                                allServices
                            }
                        </ul>
                    </div>
                    {/* <!-- /.service-sidebar__item --> */}
                    <div className="service-sidebar__item service-sidebar__item--contact">
                        <div className="service-sidebar__bg" style={{backgroundImage:`url('${BASE_URL+"/uploads/service/"+service.image}')`}}>
                        </div>
                        {/* <!-- /.service-sidebar__bg --> */}
                        <div className="service-sidebar__contact">
                            <div className="service-sidebar__icon">
                                <i className="fa fa-registered"></i>
                            </div>
                            {/* <!-- /.service-sidebar__icon --> */}
                            <h3 className="service-sidebar__title text-nowrap">Get started?</h3>
                                {/* <!-- /.service-sidebar__title --> */}
                            <hr className="service-sidebar__separator"/>
                            <p className="service-sidebar__tagline">Click the link below to Sign up</p>
                            {/* <!-- /.service-sidebar__tagline --> */}
                            <a className="service-sidebar__phone btn-md btn border border-3 border-white" href="/auth/register">Register NOW</a>
                        </div>
                        {/* <!-- /.service-sidebar__contact --> */}
                    </div>
                    {/* <!-- /.service-sidebar__item --> */}
                </div>
                {/* <!-- /.service-sidebar --> */}
            </div>
            {/* <!-- /.col-lg-4 --> */}
            <div className="col-lg-8">
                <div className="service-details__image">
                    <img src={BASE_URL+"/uploads/service/"+service.image} alt=""/>
                    <div className="service-details__icon">
                        <i className={service?.icon}></i>
                    </div>
                    {/* <!-- /.service-details__icon --> */}
                </div>
                {/* <!-- /.service-details__image --> */}
                
                 <div className="service-details__content" dangerouslySetInnerHTML={{__html:service?.body}}></div>
                
                {/* <!-- /.service-details__content --> */}
            </div>
            {/* <!-- /.col-lg-8 --> */}
        </div>
        {/* <!-- /.row --> */}
    </div>
    {/* <!-- /.container --> */}
</section>
{/* <!-- /.service-details --> */}
    </>
  )
}

export default React.memo(Service)
