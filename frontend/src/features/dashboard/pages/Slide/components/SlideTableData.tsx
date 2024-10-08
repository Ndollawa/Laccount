import React, { useState } from 'react'
import showToast from '../../../../../app/utils/showToast'
import Swal from 'sweetalert2'
import LightGallery from 'lightgallery/react'
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
// import 'lightgallery/css/lg-thumbnail.css'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
// import 'lightgallery/css/lg-thumbnail.css'
import { HomeSlide } from '../../../../../app/props/settingsProps'
import { useSelector } from 'react-redux'
import { useUpdateSettingMutation } from '../../Settings/slices/settingApi.slice'
import { setLandingSetting, useLandingConfig } from '../../Settings/slices/settings.slice'
import { useDispatch } from 'react-redux'
const BASE_URL = import.meta.env.VITE_BASE_URL;
const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL;


const SlideTableData = ({slide,index,showEditForm}:any) => {
   
  const { id, settings: {sliders, ...otherSettings } = {} } = useSelector(useLandingConfig);
  const dispatch = useDispatch();
    const [updateSetting, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useUpdateSettingMutation()
    const onDeleteSlide = async (slideId:number) => {
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
              const filteredSlides = sliders?.filter(slide =>slide.id !== slideId)
              const settings = { sliders:filteredSlides, ...otherSettings };
         
                await updateSetting({ id, settings }).unwrap();
                dispatch(setLandingSetting(settings));
        if(isDelError) return showToast('error',JSON.stringify(delerror?.data))
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Slide  has been deleted.',
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
  
    if (slide) {
         const slideData = {
        data:{
        id:slide?.id,
        title:slide?.title,
        description:slide?.description,
        image:slide?.image,
        cto:slide?.cto,
        body:slide?.body,
        status:slide?.status

        },
        showModal:true
    }
    let slideStatus;
    switch (slide.status) {
    case 'pending':
        slideStatus =<span className="badge badge-primary">{slide.status}</span>
        break;
    case 'active':
        slideStatus =<span className="badge badge-success">{slide.status}</span>
        break;
    case 'inactive':
        slideStatus =<span className="badge badge-danger">{slide.status}</span>
        break;
    default:
        slideStatus = ""
        break;
}

        return (
            <><tr key={slide.id}>
                    <td>{++index}</td>
                    <td>
                    <LightGallery plugins={[lgZoom]} > <a href={`${BASE_URL}/uploads/settings/slides/${slide.image}`}  data-lightbox={`image-${++index}`} data-exthumbimage={BASE_URL+"/uploads/slide/"+slide.image} data-src={BASE_URL+"/uploads/slide/"+slide.image} data-title={slide.title}>
                        <img src={`${BASE_URL}/uploads/settings/slides/${slide.image}`} alt={slide.title} width="150" /></a></LightGallery></td>
                    <td>{slide.title}</td>
                    <td>{slide.description}</td>
                    <td  dangerouslySetInnerHTML={{__html:slide.body}} ></td>
                    <td align="center">{slideStatus}</td>
                    <td>
                    <div className="d-flex">
                            <button type="button" className="btn btn-info light shadow btn-xs sharp me-1"   onClick={()=>showEditForm(slideData)}><i className="fas fa-pencil-alt"></i></button>
                            <button type="button" className="btn btn-danger light shadow btn-xs sharp" onClick={()=>onDeleteSlide(slide.id)}><i className="fa fa-trash"></i></button>
                        </div>													
                    </td>												
                </tr></>
        )
    
    } else return null
  
}

export default React.memo(SlideTableData)