import React, { useState, useEffect, useTransition } from 'react';
import LightGallery from 'lightgallery/react';
import { useDispatch, useSelector } from 'react-redux';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import Swal from 'sweetalert2';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { useUpdateSettingMutation } from '@dashboard/pages/Settings/slices/settingApi.slice';
import { setLandingSetting, useLandingConfig } from '@dashboard/pages/Settings/slices/settings.slice';
import MainBody from '@dashboard/components/MainBody';
import CreateSlideModal from './components/CreateSlideForm';
import EditSlideForm from './components/EditSlideForm';
import showToast from '@utils/showToast';
const SLIDER_ASSETS = import.meta.env.VITE_SLIDER_ASSETS;
import { setPreloader } from '@components/preloader/slices/preloader.slice';
import PageProps from '@props/pageProps';
import { HomeSlide } from '@props/settingsProps';
import { ModalDataProps } from '@props/modalProps';
import GeneralPreloader from '@components/preloader/GeneralPreloader';
import DataTableComponent from '@components/DataTableComponent';

const Slide = ({ pageData }: PageProps) => {
  const { id, settings: { sliders, ...otherSettings } = {} } = useSelector(useLandingConfig);
  const [modalData, setModalData] = useState<ModalDataProps<HomeSlide>["modalData"]>({
    data: null,
    showModal: false,
  });
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();

  const [updateSetting, { isSuccess: isDelSuccess, isError: isDelError, error: delError }] = useUpdateSettingMutation();
  // Function to handle delete slide
  const onDeleteSlide = async (slideId: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const filteredSlides = sliders?.filter(slide => slide.id !== slideId);
        const settings = { sliders: filteredSlides, ...otherSettings };

        await updateSetting({ id, settings }).unwrap();
        dispatch(setLandingSetting(settings));

        if (isDelError) return showToast('error', delError?.data.message);
        Swal.fire('Deleted!', 'Slide has been deleted.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Operation aborted, entry is safe :)', 'error');
      }
    });
  };

  const showEditForm = (modalData: ModalDataProps<HomeSlide>["modalData"]) => {
    setModalData(modalData);
  };

  const tableHead = ["S/N", "Image", "Title", "Sub Heading", "Description", "Status", "Action"];

  const renderSlideStatus = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <span className="badge badge-primary">{status}</span>;
      case 'ACTIVE':
        return <span className="badge badge-success">{status}</span>;
      case 'INACTIVE':
        return <span className="badge badge-danger">{status}</span>;
      default:
        return null;
    }
  };

  const slots = {
    1: (data: any, row: any) => (
      <LightGallery plugins={[lgZoom]}>
        <a href={`${SLIDER_ASSETS}${row.image}`} data-lightbox={`image-${row.id}`} data-exthumbimage={SLIDER_ASSETS + row.image} data-src={SLIDER_ASSETS + row.image} data-title={row.title}>
          <img src={`${SLIDER_ASSETS}${row.image}`} alt={row.title} width="150" />
        </a>
      </LightGallery>
    ),
    // 4: (data: any, row: any) => (
    //   <div className="text-wrap text-left w-40" dangerouslySetInnerHTML={{ __html: row.body }}></div>
    // ),
    5: (data, row) => <div>
            {row.status ? renderSlideStatus(row.status) : 'No Status Available'}
          </div>, 
    6: (data: any, row: any) => (
      <div className="d-flex">
        <button type="button" className="btn btn-info light shadow btn-xs sharp me-1" onClick={() => showEditForm({ data: row.slide, showModal: true })}>
          <i className="fas fa-pencil-alt"></i>
        </button>
        <button type="button" className="btn btn-danger light shadow btn-xs sharp" onClick={() => onDeleteSlide(row.slide.id)}>
          <i className="fa fa-trash"></i>
        </button>
      </div>
    ),
  };

  const slidersTableData = sliders?.length && sliders?.map((slide: HomeSlide, i: number) =>( {
    i:(i + 1),
    image:slide.image,
    title:slide.title,
    description:slide.description,
    body:slide.body,
    status:slide.status,
    slide:slide
})) || [];

  const tprops = {
    data: slidersTableData,
    slots,
    options: {
    columns: [
            { data: 'i', name: 'i', width:'2%' },
            { data: 'image',name:'image', width:'12%' },
            { data: 'title',name:'title', width:'15%'  },
            { data: 'description',name:'description', width:'15%'  },
            { data: 'body', name:'body', width:'38%' },
            { data: 'status',name:'status', width:'8%'  },
            { data: 'slide', name:'actions', width:'10%' },
          ],
      autoWidth: true,
      processing: true,
      // responsive: true,
      scrollX: true,
      scrollY: 'true',
      stateSave: true,
      select: false,
    },
  };
  return (
    <>
      <MainBody>
        <div className="container-fluid">
          <div className="col-12 mt-5">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">All Slides</h4>
              </div>
              <div className="card-body">
                <div className="mb-5 d-flex">
                  <CreateSlideModal />
                </div>
                <EditSlideForm modalData={modalData} />
                <div className="table-responsive table-scrollable">
                  {isPending ? <GeneralPreloader /> : <DataTableComponent tableHead={tableHead} dataTableProps={tprops} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainBody>
    </>
  );
};

export default React.memo(Slide);
