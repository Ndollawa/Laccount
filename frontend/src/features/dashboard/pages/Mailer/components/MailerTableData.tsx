import React, { useState } from 'react'
import showToast from '@utils/showToast'
import Swal from 'sweetalert2'
import LightGallery from 'lightgallery/react'
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
// import 'lightgallery/css/lg-thumbnail.css'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
// import 'lightgallery/css/lg-thumbnail.css'
import { HomeMailer } from '@props/settingsProps'
import { useSelector } from 'react-redux'
import { useUpdateSettingMutation } from '../../Settings/slices/settingApi.slice'
import { setLandingSetting, useLandingConfig } from '../../Settings/slices/settings.slice'
import { useDispatch } from 'react-redux'
const BASE_URL = import.meta.env.VITE_BASE_URL;
const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL;


const MailerTableData = ({mailer,index,showEditForm}:any) => {
   
  const { id, settings: {mailerrs, ...otherSettings } = {} } = useSelector(useLandingConfig);
  const dispatch = useDispatch();
    const [updateSetting, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useUpdateSettingMutation()
    const onDeleteMailer = async (mailerId:number) => {
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
              const filteredMailers = mailerrs?.filter(mailer =>mailer.id !== mailerId)
              const settings = { mailerrs:filteredMailers, ...otherSettings };
         
                await updateSetting({ id, settings }).unwrap();
                dispatch(setLandingSetting(settings));
        if(isDelError) return showToast('error',JSON.stringify(delerror?.data))
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Mailer  has been deleted.',
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
// 
  
    if (mailer) {
         const mailerData = {
        data:{
        id:mailer?.id,
        title:mailer?.title,
        description:mailer?.description,
        image:mailer?.image,
        cto:mailer?.cto,
        body:mailer?.body,
        status:mailer?.status

        },
        showModal:true
    }
    let mailerStatus;
    switch (mailer.status) {
    case 'pending':
        mailerStatus =<span className="badge badge-primary">{mailer.status}</span>
        break;
    case 'active':
        mailerStatus =<span className="badge badge-success">{mailer.status}</span>
        break;
    case 'inactive':
        mailerStatus =<span className="badge badge-danger">{mailer.status}</span>
        break;
    default:
        mailerStatus = ""
        break;
}

        return (
            <><tr key={mailer.id}>
                    <td>{++index}</td>
                    <td>
                    <LightGallery plugins={[lgZoom]} > <a href={`${BASE_URL}/uploads/settings/mailers/${mailer.image}`}  data-lightbox={`image-${++index}`} data-exthumbimage={BASE_URL+"/uploads/mailer/"+mailer.image} data-src={BASE_URL+"/uploads/mailer/"+mailer.image} data-title={mailer.title}>
                        <img src={`${BASE_URL}/uploads/settings/mailers/${mailer.image}`} alt={mailer.title} width="150" /></a></LightGallery></td>
                    <td>{mailer.title}</td>
                    <td>{mailer.description}</td>
                    <td  dangerouslySetInnerHTML={{__html:mailer.body}} ></td>
                    <td align="center">{mailerStatus}</td>
                    <td>
                    <div className="d-flex">
                            <button type="button" className="btn btn-info light shadow btn-xs sharp me-1"   onClick={()=>showEditForm(mailerData)}><i className="fas fa-pencil-alt"></i></button>
                            <button type="button" className="btn btn-danger light shadow btn-xs sharp" onClick={()=>onDeleteMailer(mailer.id)}><i className="fa fa-trash"></i></button>
                        </div>													
                    </td>												
                </tr></>
        )
    
    } else return null
  
}

export default React.memo(MailerTableData)