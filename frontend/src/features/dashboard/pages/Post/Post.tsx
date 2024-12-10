import React, { useState, useEffect, useTransition } from 'react';
import LightGallery from 'lightgallery/react';
import { useDispatch, useSelector } from 'react-redux';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import Swal from 'sweetalert2';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import MainBody from '../../components/MainBody'
import CreatePostForm from './components/CreatePostForm'
import EditPostForm from './components/EditPostForm'
import {useGetPostsQuery,useDeletePostMutation } from './slices/postApi.slice'
import { setPreloader } from '@components/preloader/slices/preloader.slice'
import PageProps from '@props/pageProps'
import { ModalDataProps } from '@props/modalProps';
import GeneralPreloader from '@components/preloader/GeneralPreloader';
import DataTableComponent from '@components/DataTableComponent';   
import PostProps from '@props/postProps'
import showToast from '@utils/showToast';
    const POST_ASSETS = import.meta.env.VITE_POST_ASSETS;
   
    const Post = ({ pageData }: PageProps) => {
    
      const [modalData, setModalData] = useState<ModalDataProps<PostProps>["modalData"]>({
        data: null,
        showModal: false,
      });
      const [isPending, startTransition] = useTransition();
      const dispatch = useDispatch();
      const {
        data:posts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery('postList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })   
      const [deletePost, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }]:any = useDeletePostMutation()

      const showEditForm = (modalData: ModalDataProps<PostProps>["modalData"]) => {
        setModalData(modalData);
      };
      // Function to handle delete slide
      const onDeletePost = async (id: string) => {
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
               await deletePost({ id: id })
             if (isDelError) return showToast('error', JSON.stringify(delError?.data));
            Swal.fire('Deleted!', 'Post record has been deleted.', 'success');
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelled', 'Operation aborted, entry is safe :)', 'error');
          }
        });
      };
 
      const tableHead = ["S/N", "Image","Title", "Description", "Category",  "Status","Date Created", "Action"];
      const renderPostStatus = (status: string) => {
        switch (status) {
        //   case '':
        //     return <span className="badge badge-primary">{status}</span>;
          case 'PUBLISHED':
            return <span className="badge badge-success">{status}</span>;
          case 'DRAFT':
            return <span className="badge badge-warning">{status}</span>;
          default:
            return null;
        }
      };
    
      const slots = {
        1: (data: any, row: any) => (
          <LightGallery plugins={[lgZoom]}>
            <a href={`${POST_ASSETS}${row.image}`} data-lightbox={`image-${row.id}`} data-exthumbimage={POST_ASSETS + row.image} data-src={POST_ASSETS + row.image} data-title={row.title}>
              <img src={`${POST_ASSETS}${row.image}`} alt={row.title} width="150" />
            </a>
          </LightGallery>
        ),
        // 4: (data: any, row: any) => (
        //   <div className="text-wrap text-left w-40" dangerouslySetInnerHTML={{ __html: row.body }}></div>
        // ),
        5: (data, row) => <div>
                {row.status ? renderPostStatus(row.status) : 'No Status Available'}
              </div>, 
        7: (data: any, row: any) => (
          <div className="d-flex">
            <button type="button" className="btn btn-info light shadow btn-xs sharp me-1" onClick={() => showEditForm({ data: row.post, showModal: true })}>
              <i className="fas fa-pencil-alt"></i>
            </button>
            <button type="button" className="btn btn-danger light shadow btn-xs sharp" onClick={() => onDeletePost(row.post.id)}>
              <i className="fa fa-trash"></i>
            </button>
          </div>
        ),
      };
    
      const postTableData =  posts?.entities && Object.values(posts?.entities)?.map((post: PostProps, i: number) =>( {
        i:(i + 1),
        image:post.image,
        title:post?.title,
        description:post.description,
        category:post.category,
        status:post.status,
        createdAt:  new Date(post?.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year:'numeric' }),
        post:post
    })) || [];
    
      const tprops = {
        data: postTableData,
        slots,
        options: {
        columns: [
                { data: 'i', name: 'i', width:'5%' },
                { data: 'image',name:'image', width:'15%' },
                { data: 'title',name:'title', width:'15%'  },
                { data: 'description',name:'description', width:'35%'  },
                { data: 'category', name:'category', width:'5%' },
                { data: 'status',name:'status', width:'5%'  },
                { data: 'createdAt',name:'createdAt', width:'5%'  },
                { data: 'post', name:'actions', width:'10%' },
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
                    <h4 className="card-title">All Posts</h4>
                  </div>
                  <div className="card-body">
                    <div className="mb-5 d-flex">                                    
                        <CreatePostForm/>
                    </div>
                        <EditPostForm modalData={modalData}/>
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
    
    export default React.memo(Post);
    