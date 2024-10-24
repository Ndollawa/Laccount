import React, {ChangeEvent,FormEvent,useState,useEffect} from 'react'
import { useUpdatePostCategoryMutation} from '../slices/postCategoryApi.slice'
import showToast from '../../../../../app/utils/showToast'
import PostCategoryProps from '../../../../../app/props/PostCategoryProps';





interface modalDataProps {
  modalData:{
     data:PostCategoryProps | null,
    showModal:boolean;
  } 
  showEditForm:any
  }
const EditPostCategoryForm = ({modalData:{data,showModal},showEditForm}:modalDataProps) => {

const [title, setTitle] = useState(data?.title!)
const [status, setStatus] = useState(data?.status!)

const [updatePostCategory, {
  isLoading,
  isSuccess,
  isError,
  error
}]:any = useUpdatePostCategoryMutation()

// const navigate = useNavigate()
React.useEffect(() => {
  if (isSuccess) {
      setTitle('')
  }
}, [isSuccess])
const canSave = [title,status].every(Boolean) && !isLoading

const handleSubmit = async(e:FormEvent)=>{
e.preventDefault();
 if (canSave) {
      await updatePostCategory({title,status,_id:data?._id})
      if(isError) return showToast('error',JSON.stringify(error?.data?.message))
      showToast('success', 'Post category updated successfully')
  }

}

  return (
    <>

         <form onSubmit={handleSubmit}>
          <div className="basic-form">
                <div className="form-group">
                  <label className="form-label"><strong>Title or Category</strong></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label"><strong>Status</strong></label>
                  <select
                    id="inputState"
                    className="default-select form-control wide"
                    value={status}
                    onChange={(e)=>setStatus(e.target.value)}
                   
                  >
                    <option value='active'>Active</option>
                    <option value='inactive'>Inactive</option>
                  </select>
                </div>
               
                <div className='text-right'>
                    <button type='button' className='btn btn-dark btn-sm m-2' onClick={()=>showEditForm({data:null,showModal:false})}  >Cancel</button>
                    <button type='submit' className='btn btn-secondary btn-sm m-2' disabled={!canSave}  >Update</button>
                </div>
             </div>

            </form>
    </>
  )
}

export default React.memo(EditPostCategoryForm)