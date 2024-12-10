import React,{useState,useEffect,useMemo} from 'react'
import {useGetServicesQuery,useDeleteServiceMutation } from '../slices/servicesApi.slice'
import showToast from '@utils/showToast'
import LightGallery from 'lightgallery/react'
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
// import 'lightgallery/css/lg-thumbnail.css'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
// import 'lightgallery/css/lg-thumbnail.css'
import $ from 'jquery'
import Swal  from 'sweetalert2'
import ServiceProps from '@props/ServiceProps'
import initDataTables,{destroyDataTables} from '@hooks/useDataTables'
const BASE_URL = import.meta.env.VITE_BASE_URL;
const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL;


const ServiceTableData = ({serviceId,index,showEditForm, showDetails}:any) => {
    const { service } = useGetServicesQuery("servicesList", {
        selectFromResult: ({ data }) => ({
            service: data?.entities[serviceId]
        }),
    })

 
useEffect(() => {

            destroyDataTables($('#dataTable'))
              initDataTables($('#dataTable'),"Our Services")
            return () => {
             destroyDataTables($('#dataTable'))
            }
          }, [service])
    


    const [deleteService, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }]:any = useDeleteServiceMutation()
    const onDeleteService = async (id:string) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-sm m-2 btn-success',
              cancelButton: 'btn btn-sm m-2 btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then(async(result) => {
            if (result.isConfirmed) {  
        await deleteService({ id: id })
        if(isDelError) return showToast('error',JSON.stringify(delerror?.data))
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Service has been deleted.',
                'success'
              )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Operation aborted, entry is safe  :)',
                'error'
              )
            }
          })
      
    }

    if (service) {
        const created = new Date(service.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year:'numeric' })
       const serviceData = {
        data:{
        id:serviceId,
        title:service.title,
        description:service.description,
        image:service.image,
        icon:service.icon,
        body:service.body,
        status:service.status

        },
        showModal:true
    }
    let serviceStatus
    switch (service.status) {
    case 'active':
        serviceStatus =<span className="badge badge-success">{service.status}</span>
        break;
    case 'inactive':
        serviceStatus =<span className="badge badge-warning">{service.status}</span>
        break;
   
    default:
        serviceStatus = ""
        break;
}
        return (
            <tr key={serviceId}>
                    <td>{++index}</td>
                    <td><LightGallery plugins={[lgZoom]} > <a href={BASE_URL+"/uploads/settings/service/"+service.image}  data-lightbox={`image-${++index}`} data-exthumbimage={BASE_URL+"/uploads/settings/service/"+service.image} data-src={BASE_URL+"/uploads/settings/service/"+service.image} data-title={service.title}>
                        <img src={BASE_URL+"/uploads/settings/service/"+service.image} alt={service.title} width="120" className="lg img-fluid img-responsive" />
                        </a></LightGallery></td>
                    <td>{service.title}</td>
                    <td>{service.description}</td>
                    <td>{serviceStatus}</td>
                    <td>{created}</td>
                    <td>
                    <div className="d-flex"> <button type="button" className="btn btn-success light shadow btn-xs sharp me-1"   onClick={()=>{showDetails({
        data:{
        id:serviceId,
        title:service.title,
        description:service.description,
        image:service.image,
        icon:service.icon,
        body:service.body,
        status:service.status

        },
        showModal:true})}}><i className="fas fa-eye"></i></button>
                            <button type="button" className="btn btn-info light shadow btn-xs sharp me-1"   onClick={()=>showEditForm(serviceData)}><i className="fas fa-pencil-alt"></i></button>
                            <button className="btn btn-danger light shadow btn-xs sharp" onClick={()=>onDeleteService(service.id)}><i className="fa fa-trash"></i></button>
                        </div>													
                    </td>												
                </tr>
        )
    
    } else return null
  
}

export default React.memo(ServiceTableData)