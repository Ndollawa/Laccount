    import React,{useState,useEffect} from 'react'
    import MainBody from '../../components/MainBody'
    import CreateFaqModal from './components/CreatePostForm'
    import EditPostForm from './components/EditPostForm'
    import { useDispatch } from 'react-redux'
    import { useGetPostsQuery } from './slices/postApi.slice'
    import { setPreloader } from '../../../components/preloader/slices/preloader.slice'
    import PageProps from '../../../../app/props/PageProps'
    import PostTableData from './components/PostTableData'
   import PostProps from '../../../../app/props/PostProps' 
import $ from 'jquery'
import initDataTables,{destroyDataTables} from '../../../../app/utils/initDataTables'   
 

    
interface modalDataProps {
       data:PostProps | null,
      showModal:boolean,
    }
    const Post = ({pageData}:PageProps)  => {
        const dispatch =useDispatch()
        const [modalData,setModalData] = useState<modalDataProps>({
            data:null, 
            showModal:false,
           })
    const {
        data:posts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery('postsList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    const showEditForm = (modalData:modalDataProps)=>{
        console.log(modalData)
        setModalData(modalData);
        }
    let tableContent
    if (isSuccess) {
        const { ids } = posts
    
        tableContent = ids?.length
            ? ids.map((postId:string|number ,i:number) => <PostTableData key={postId} postId={postId} index={i}
            showEditForm={showEditForm} />
        )
            : null
         
    }
 useEffect(() => {

            destroyDataTables($('#dataTable'))
              initDataTables($('#dataTable'),"All Posts")
            return () => {
             destroyDataTables($('#dataTable'))
            }
          }, [posts])    
    
        useEffect(() => {
            dispatch(setPreloader(isLoading?true:false)) 
             
            }, [isLoading])

    
     return (
        <>
        <MainBody>
        <div className="container-fluid">
            <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">All Posts</h4>
                                </div>
                                <div className="card-body">
    
                                    <div className="mb-5 d-flex">
                                    
                        <CreateFaqModal/>
                        <EditPostForm modalData={modalData} />
                                    </div>
                            <div className="table-responsive table-scrollable">
                                        <table id="dataTable" className="table table-bordered table-hover table-checkable order-column valign-middle border mb-0 align-items-centerid" style={{minWidth: '845px'}}>
                                            <thead>
                                                <tr>
                                                    <th>S/N</th>
                                                    <th>Image</th>
                                                    <th>Title</th>
                                                    <th>Description</th>
                                                    <th>Category</th>
                                                    <th>Content</th>
                                                    <th>Status</th>
                                                    <th>Date Created</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                               
                                               
                                               {tableContent}
                                            
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                 </div>
        </MainBody>
        </>
      )
    }
    

export default React.memo(Post)