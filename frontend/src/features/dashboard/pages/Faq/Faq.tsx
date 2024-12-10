
    import React, { useState, useEffect, useTransition } from 'react';
    import LightGallery from 'lightgallery/react';
    import { useDispatch, useSelector } from 'react-redux';
    import 'lightgallery/css/lightgallery.css';
    import 'lightgallery/css/lg-zoom.css';
    import Swal from 'sweetalert2';
    import lgThumbnail from 'lightgallery/plugins/thumbnail';
    import lgZoom from 'lightgallery/plugins/zoom';
    import MainBody from '../../components/MainBody'
    import CreateFaqForm from './components/CreateFaqForm'
    import EditFaqForm from './components/EditFaqForm'
    import {useGetFaqsQuery,useDeleteFaqMutation } from './slices/faqApi.slice'
    import { setPreloader } from '@components/preloader/slices/preloader.slice'
    import PageProps from '@props/pageProps'
    import { ModalDataProps } from '@props/modalProps';
    import GeneralPreloader from '@components/preloader/GeneralPreloader';
    import DataTableComponent from '@components/DataTableComponent';   
    import FaqProps from '@props/faqProps'
    import showToast from '@utils/showToast';
       
        const Faq = ({ pageData }: PageProps) => {
        
          const [modalData, setModalData] = useState<ModalDataProps<FaqProps>["modalData"]>({
            data: null,
            showModal: false,
          });
          const [isPending, startTransition] = useTransition();
          const dispatch = useDispatch();
          const {
            data:faqs,
            isLoading,
            isSuccess,
            isError,
            error
        } = useGetFaqsQuery('faqList', {
            pollingInterval: 15000,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true
        })   
          const [deleteFaq, {
            isSuccess: isDelSuccess,
            isError: isDelError,
            error: delerror
        }] = useDeleteFaqMutation()
    
          const showEditForm = (modalData: ModalDataProps<FaqProps>["modalData"]) => {
            setModalData(modalData);
          };
          // Function to handle delete slide
          const onDeleteFaq = async (id: string) => {
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
                   await deleteFaq({ id: id })
                 if (isDelError) return showToast('error', JSON.stringify(delError?.data));
                Swal.fire('Deleted!', 'Faq record has been deleted.', 'success');
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'Operation aborted, entry is safe :)', 'error');
              }
            });
          };
     
          const tableHead = ["S/N", "Question", "Response", "Status","Date Created", "Action"];
          const renderFaqStatus = (status: string) => {
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
            3: (data, row) => <div>
                    {row.status ? renderFaqStatus(row.status) : 'No Status Available'}
                  </div>, 
            5: (data: any, row: any) => (
              <div className="d-flex">
                <button type="button" className="btn btn-info light shadow btn-xs sharp me-1" onClick={() => showEditForm({ data: row.faq, showModal: true })}>
                  <i className="fas fa-pencil-alt"></i>
                </button>
                <button type="button" className="btn btn-danger light shadow btn-xs sharp" onClick={() => onDeleteFaq(row.faq.id)}>
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            ),
          };
        
          const faqTableData =  faqs?.entities && Object.values(faqs?.entities)?.map((faq: FaqProps, i: number) =>( {
            i:(i + 1),
            question:faq?.question,
            response:faq.response.substr(0,100),
            status:faq.status,
            createdAt:  new Date(faq?.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year:'numeric' }),
            faq:faq
        })) || [];
        
          const tprops = {
            data: faqTableData,
            slots,
            options: {
            columns: [
                    { data: 'i', name: 'i', width:'5%' },
                    { data: 'question',name:'question', width:'25%'  },
                    { data: 'response',name:'response', width:'50%'  },
                    { data: 'status',name:'status', width:'5%'  },
                    { data: 'createdAt',name:'createdAt', width:'5%'  },
                    { data: 'faq', name:'actions', width:'10%' },
                  ],
              autoWidth: true,
              processing: true,
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
                        <h4 className="card-title">All Faqs</h4>
                      </div>
                      <div className="card-body">
                        <div className="mb-5 d-flex">                                    
                            <CreateFaqForm/>
                        </div>
                            <EditFaqForm modalData={modalData}/>
                        <div className="table-responsive table-scrollable user-select-none">
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
        
        export default React.memo(Faq);
        