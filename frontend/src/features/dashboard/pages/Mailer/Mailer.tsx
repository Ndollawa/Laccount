
    import React, { useState, useEffect, useTransition } from 'react';
    import LightGallery from 'lightgallery/react';
    import { useDispatch, useSelector } from 'react-redux';
    import 'lightgallery/css/lightgallery.css';
    import 'lightgallery/css/lg-zoom.css';
    import Swal from 'sweetalert2';
    import lgThumbnail from 'lightgallery/plugins/thumbnail';
    import lgZoom from 'lightgallery/plugins/zoom';
    import MainBody from '../../components/MainBody'
    import CreateMailerForm from './components/CreateMailerForm'
    import EditMailerForm from './components/EditMailerForm'
    import {useGetMailersQuery,useDeleteMailerMutation } from './slices/mailersApi.slice'
    import { setPreloader } from '@components/preloader/slices/preloader.slice'
    import PageProps from '@props/pageProps'
    import { ModalDataProps } from '@props/modalProps';
    import GeneralPreloader from '@components/preloader/GeneralPreloader';
    import DataTableComponent from '@components/DataTableComponent';   
    import MailerProps from '@props/mailerProps'
    import showToast from '@utils/showToast';
        const SERVICE_ASSETS = import.meta.env.VITE_SERVICE_ASSETS;
       
        const Mailer = ({ pageData }: PageProps) => {
        
          const [modalData, setModalData] = useState<ModalDataProps<MailerProps>["modalData"]>({
            data: null,
            showModal: false,
          });
          const [isPending, startTransition] = useTransition();
          const dispatch = useDispatch();
          const {
            data:mailers,
            isLoading,
            isSuccess,
            isError,
            error
        } = useGetMailersQuery('mailerList', {
            pollingInterval: 15000,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true
        })   
          const [deleteMailer, {
            isSuccess: isDelSuccess,
            isError: isDelError,
            error: delerror
        }]:any = useDeleteMailerMutation()
    
          const showEditForm = (modalData: ModalDataProps<MailerProps>["modalData"]) => {
            setModalData(modalData);
          };
          // Function to handle delete slide
          const onDeleteMailer = async (id: string) => {
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
                   await deleteMailer({ id: id })
                 if (isDelError) return showToast('error', JSON.stringify(delError?.data));
                Swal.fire('Deleted!', 'Mailer record has been deleted.', 'success');
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'Operation aborted, entry is safe :)', 'error');
              }
            });
          };
     
          const tableHead = ["S/N", "Image","Title", "Description", "Status","Date Created", "Action"];
          const renderMailerStatus = (status: string) => {
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
                    {row.status ? renderMailerStatus(row.status) : 'No Status Available'}
                  </div>, 
            7: (data: any, row: any) => (
              <div className="d-flex">
                <button type="button" className="btn btn-info light shadow btn-xs sharp me-1" onClick={() => showEditForm({ data: row.mailer, showModal: true })}>
                  <i className="fas fa-pencil-alt"></i>
                </button>
                <button type="button" className="btn btn-danger light shadow btn-xs sharp" onClick={() => onDeleteMailer(row.mailer.id)}>
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            ),
          };
        
          const mailerTableData =  mailers?.entities && Object.values(mailers?.entities)?.map((mailer: MailerProps, i: number) =>( {
            i:(i + 1),
            image:mailer.image,
            title:mailer?.title,
            description:mailer.description,
            status:mailer.status,
            createdAt:  new Date(mailer?.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year:'numeric' }),
            mailer:mailer
        })) || [];
        
          const tprops = {
            data: mailerTableData,
            slots,
            options: {
            columns: [
                    { data: 'i', name: 'i', width:'5%' },
                    { data: 'image',name:'image', width:'15%' },
                    { data: 'title',name:'title', width:'15%'  },
                    { data: 'description',name:'description', width:'35%'  },
                    { data: 'status',name:'status', width:'5%'  },
                    { data: 'createdAt',name:'createdAt', width:'5%'  },
                    { data: 'mailer', name:'actions', width:'10%' },
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
                        <h4 className="card-title">All Mailers</h4>
                      </div>
                      <div className="card-body">
                        <div className="mb-5 d-flex">                                    
                            <CreateMailerForm/>
                        </div>
                            <EditMailerForm modalData={modalData}/>
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
        
        export default React.memo(Mailer);
        