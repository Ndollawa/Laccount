
    import React, { useState, useEffect, useTransition } from 'react';
    import LightGallery from 'lightgallery/react';
    import { useDispatch, useSelector } from 'react-redux';
    import 'lightgallery/css/lightgallery.css';
    import 'lightgallery/css/lg-zoom.css';
    import Swal from 'sweetalert2';
    import lgThumbnail from 'lightgallery/plugins/thumbnail';
    import lgZoom from 'lightgallery/plugins/zoom';
    import MainBody from '../../components/MainBody'
    import CreateServiceForm from './components/CreateServiceForm'
    import EditServiceForm from './components/EditServiceForm'
    import {useGetServicesQuery,useDeleteServiceMutation } from './slices/servicesApi.slice'
    import { setPreloader } from '@components/preloader/slices/preloader.slice'
    import PageProps from '@props/pageProps'
    import { ModalDataProps } from '@props/modalProps';
    import GeneralPreloader from '@components/preloader/GeneralPreloader';
    import DataTableComponent from '@components/DataTableComponent';   
    import ServiceProps from '@props/serviceProps'
    import showToast from '@utils/showToast';
        const SERVICE_ASSETS = import.meta.env.VITE_SERVICE_ASSETS;
       
        const Service = ({ pageData }: PageProps) => {
        
          const [modalData, setModalData] = useState<ModalDataProps<ServiceProps>["modalData"]>({
            data: null,
            showModal: false,
          });
          const [isPending, startTransition] = useTransition();
          const dispatch = useDispatch();
          const {
            data:services,
            isLoading,
            isSuccess,
            isError,
            error
        } = useGetServicesQuery('serviceList', {
            pollingInterval: 15000,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true
        })   
          const [deleteService, {
            isSuccess: isDelSuccess,
            isError: isDelError,
            error: delerror
        }]:any = useDeleteServiceMutation()
    
          const showEditForm = (modalData: ModalDataProps<ServiceProps>["modalData"]) => {
            setModalData(modalData);
          };
          // Function to handle delete slide
          const onDeleteService = async (id: string) => {
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
                   await deleteService({ id: id })
                 if (isDelError) return showToast('error', JSON.stringify(delError?.data));
                Swal.fire('Deleted!', 'Service record has been deleted.', 'success');
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'Operation aborted, entry is safe :)', 'error');
              }
            });
          };
     
          const tableHead = ["S/N", "Image","Title", "Description", "Status","Date Created", "Action"];
          const renderServiceStatus = (status: string) => {
            switch (status) {
            //   case '':
            //     return <span className="badge badge-primary">{status}</span>;
              case 'ACTIVE':
                return <span className="badge badge-success">{status}</span>;
              case 'INACTIVE':
                return <span className="badge badge-warning">{status}</span>;
              default:
                return null;
            }
          };
        
          const slots = {
            1: (data: any, row: any) => (
              <LightGallery plugins={[lgZoom]}>
                <a href={`${SERVICE_ASSETS}${row.image}`} data-lightbox={`image-${row.id}`} data-exthumbimage={SERVICE_ASSETS + row.image} data-src={SERVICE_ASSETS + row.image} data-title={row.title}>
                  <img src={`${SERVICE_ASSETS}${row.image}`} alt={row.title} width="150" />
                </a>
              </LightGallery>
            ),
            // 4: (data: any, row: any) => (
            //   <div className="text-wrap text-left w-40" dangerouslySetInnerHTML={{ __html: row.body }}></div>
            // ),
            5: (data, row) => <div>
                    {row.status ? renderServiceStatus(row.status) : 'No Status Available'}
                  </div>, 
            7: (data: any, row: any) => (
              <div className="d-flex">
                <button type="button" className="btn btn-info light shadow btn-xs sharp me-1" onClick={() => showEditForm({ data: row.service, showModal: true })}>
                  <i className="fas fa-pencil-alt"></i>
                </button>
                <button type="button" className="btn btn-danger light shadow btn-xs sharp" onClick={() => onDeleteService(row.service.id)}>
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            ),
          };
        
          const serviceTableData =  services?.entities && Object.values(services?.entities)?.map((service: ServiceProps, i: number) =>( {
            i:(i + 1),
            image:service.image,
            title:service?.title,
            description:service.description,
            status:service.status,
            createdAt:  new Date(service?.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year:'numeric' }),
            service:service
        })) || [];
        
          const tprops = {
            data: serviceTableData,
            slots,
            options: {
            columns: [
                    { data: 'i', name: 'i', width:'5%' },
                    { data: 'image',name:'image', width:'15%' },
                    { data: 'title',name:'title', width:'15%'  },
                    { data: 'description',name:'description', width:'35%'  },
                    { data: 'status',name:'status', width:'5%'  },
                    { data: 'createdAt',name:'createdAt', width:'5%'  },
                    { data: 'service', name:'actions', width:'10%' },
                  ],
              autoWidth: true,
              processing: true,
              responsive: true,
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
                        <h4 className="card-title">All Services</h4>
                      </div>
                      <div className="card-body">
                        <div className="mb-5 d-flex">                                    
                            <CreateServiceForm/>
                        </div>
                            <EditServiceForm modalData={modalData}/>
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
        
        export default React.memo(Service);
        