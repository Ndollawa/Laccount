import React,{useState,useEffect} from 'react'
import PageProps from '@props/pageProps'
import Breadcrum from '@landing/components/Breadcrum'
import { useGetServicesQuery } from '@dashboard/pages/Service/slices/servicesApi.slice'
import ServiceProps from '@props/serviceProps'
const SERVICE_ASSETS = import.meta.env.VITE_SERVICE_ASSETS;

const Services:React.FC<PageProps> = ({pageData}:PageProps) => {
    // const { services } = useGetServicesQuery("servicesList", {
    //         selectFromResult: ({ data }) => ({
    //           services: data?.ids?.map((id:string)=>data?.entities[id])		 
    //         }),
    //         }) 
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

    const [services, setServices] = useState(data?.entities)
    useEffect(() => {
        setServices(data?.entities)
    }, [data])

    return (
      <>
  <Breadcrum pageData={pageData}/>


<section className="service-grid pt-120 pb-140">
    <div className="container">
        <div className="row row-gutter-y-50 g-5">
            {
                (Object?.values(services ?? []) as ServiceProps[])?.map((service:ServiceProps)=>{
                    return (

                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="service-card">
                            <div className="service-card__image"><a href={`/services/${service.id}`}>
                                <img src={SERVICE_ASSETS+service?.image} alt={service?.title}/>
                                </a>
                            </div>
                            {/* <!-- /.service-card__image --> */}
                            <div className="service-card__content">
                                <div className="service-card__content__inner">
                                    <div className="service-card__icon">
                                        <i className={service?.icon}></i>
                                    </div>
                                    {/* <!-- /.service-card__icon --> */}
                                    <h3 className="service-card__title">
                                        <a href={`/services/${service.id}`}>{service?.title}</a>
                                    </h3>
                                    {/* <!-- /.service-card__title --> */}
                                    <p className="service-card__text s-card">{service?.description}</p>
                                        {/* <!-- /.service-card__text --> */}
                                    <a href={`/services/${service.id}`} className="service-card__link">
                                        <i className="fa fa-angle-right"></i>
                                    </a>
                                    {/* <!-- /.service-card__link --> */}
                                </div>
                                {/* <!-- /.service-card__content__inner --> */}
                            </div>
                            {/* <!-- /.service-card__content --> */}
                        </div>
                        {/* <!-- /.service-card --> */}
                    </div>
                )})
            }
          
        </div>
        {/* <!-- /.row --> */}
    </div>
    {/* <!-- /.container --> */}
</section>
{/* <!-- /.service-grid pt-120 pb-120 --> */}

    </>
  )
}

export default React.memo(Services)
