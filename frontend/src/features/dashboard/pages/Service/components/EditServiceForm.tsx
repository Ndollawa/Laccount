import React, { useEffect, useState, useCallback } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { Button } from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';
import { PulseLoader } from 'react-spinners';
import { IoIosClose, IoMdPricetags } from 'react-icons/io';
import { useUpdateServiceMutation } from '../slices/servicesApi.slice';
import showToast from '@utils/showToast';
import handleApiErrors from '@utils/handleApiErrors';
import ServiceProps from '@props/ServiceProps';
import useWindowSize from '@hooks/useWindowSize';
import ModalComponent from '@dashboard/components/Modal';
import FileUpload from '@components/FileUpload';
import { ModalDataProps } from '@props';
import { checkKeyDown } from '@utils/form.utils';
import tinyMCEInit from '@configs/tinymce.config';

const SERVICE_ASSETS = import.meta.env.VITE_SERVICE_ASSETS;

interface FormInputs {
  title: string;
  icon: string;
  description: string;
  body: string;
  tags?: string[];
  status: string;
  image: File | null;
}


const EditServiceModal = ({ modalData: { data, showModal } }: ModalDataProps<ServiceProps>) => {
  const [previewImage, setPreviewImage] = useState<string>(`${SERVICE_ASSETS}${data?.image}`);
  const [updateService, { isSuccess, isError, error }] = useUpdateServiceMutation();
  const [tagName, setTagName] = useState("")
  const [show, setShow] = useState(false);
  const {width} = useWindowSize()
  const handleOpen = useCallback(() => setShow(true), [show]);
  const handleClose = useCallback(() => setShow(false), [show]);
  const { register, handleSubmit, setValue, getValues, reset, setError, formState: { errors, isSubmitting }, watch } = useForm<FormInputs>();
  const createTag = (e:any)=>{
    setTagName(e.target.value) 
  }
  // const tagwrapper= document.getElementsByClassName('tag-wrapper')!;
  const addTag = (e:any) =>{
  if( e.key === 'Enter' ){
    if(tagName !== ""){
    setValue('tags',  [...(getValues('tags') as string[]),tagName])
    setTagName("")
  } 
  }
  };
  const removeTag = (key:string) =>{
    setValue('tags', (getValues('tags') as string[]).filter(tag=> tag !== key ))
    setTagName("")
  };
  useEffect(() => {
    // When `data` is available, reset form fields with the new default values
    if (data) {
      setShow(showModal)
      reset({
      title: data?.title,
      icon: data?.icon,
      description: data?.description,
      body: data?.body,
      tags: data?.tags,
      status: data?.status,
      image: undefined
    });
      // Set preview image if available
      if (data.image) {
        setPreviewImage(`${SERVICE_ASSETS}${data.image}`);
      }
    }
  }, [data, reset]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      showToast('success', 'Service updated successfully');
      setPreviewImage('');
    }
    if (isError) {
      handleApiErrors(error, setError)
    }
  }, [isSuccess, isError, reset, error]);

  useEffect(() => {
    if (data?.image) {
      setPreviewImage(`${SERVICE_ASSETS}${data?.image}`);
    }
  }, [data?.image]);

  const uploadBg = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('image', file);
      setPreviewImage(URL.createObjectURL(file));
    }
  }, [setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (formFields, e) => {
    e?.preventDefault()
    await updateService({id:data.id, ...formFields});
  };

  return (
    <ModalComponent {...{size:((width as number) < 600)? "xl": "lg", header:{show:true,title:'Edit Service'},modalStates:{show,handleOpen,handleClose}}} >
      <form onKeyDown={checkKeyDown} onSubmit={(e) => handleSubmit(onSubmit)(e) } encType="multipart/form-data">
          <div className="row">
            <div className="mb-3 col-md-7">
              <label className="form-label"><strong>Name or Title</strong></label>
              <input
                type="text"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                {...register('title', { required: 'Title is required' })}
              />
              <div className="invalid-feedback">{errors.title?.message}</div>
            </div>

            <div className="mb-3 col-md-3">
              <label className="form-label"><strong>Icon Class</strong></label>
              <input
                type="text"
                className={`form-control ${errors.icon ? 'is-invalid' : ''}`}
                {...register('icon', { required: 'Icon is required' })}
              />
              <div className="invalid-feedback">{errors.icon?.message}</div>
            </div>

            <div className="mb-3 col-md-2">
              <label className="form-label"><strong>Status</strong></label>
              <select
                className={`form-control ${errors.status ? 'is-invalid' : ''}`}
                {...register('status', { required: 'Status is required' })}
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
              <div className="invalid-feedback">{errors.status?.message}</div>
            </div>

            <div className="mb-3 col-md-12">
              <label className="form-label"><strong>Description</strong></label>
              <input
                type="text"
                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                {...register('description', { required: 'Description is required' })}
              />
              <div className="invalid-feedback">{errors.description?.message}</div>
            </div>
            <div className="col-12 my-5">
                <label
                  htmlFor="postTag"
                  className="block text-sm font-medium text-gray"
                >
                  Tags {/* <span className="required"> * </span> */}
                </label> 
                <div className="mt-1 d-flex rounded-md shadow-sm align-items-stretch overflow-hidden h-100">
                  <span className="d-flex w-10 align-items-center rounded-l-md border border-r-0  bg-secondary bg-opacity-10 px-3 text-xl ">
                 <IoMdPricetags fontSize={'1.5rem'}/> </span>
                   <div className="mt-1 rounded-md shadow-sm p-1 border-2 border-secondary rounded-sm d-flex flex-wrap align-items-center m-0 w-100">
                      {getValues('tags')?.map((tagName:string,i:number)=>{
                   return(<div className="p-1 font-xs border border-secondary rounded-sm d-flex align-items-center bg-gray-light mx-1" key={i}>
                      <span >{tagName}</span>
                      <IoIosClose className="text-sm ml-1.5" onClick={(e)=>removeTag(tagName)}/>
                      </div>)})
                      }
                    <input 
                      className="d-flex font-16 p-2 outline-none bg-transparent border-0 w-100 form-control" 
                      name="tag-input"
                      value={tagName}
                      onChange={createTag}
                      onKeyDown={addTag} 
                      type="text" />
                  </div>
                </div>
              </div>
              
            <div className="col-md-6">
            <FileUpload onChange={uploadBg}/>
              <div className="invalid-feedback">{errors.image?.message}</div>
            </div>

            <div className="col-md-6">
              <label className="form-label block w-100 position-relative">Preview</label>
              {previewImage && <img className="img-responsive w-100 position-relative" src={previewImage} alt="Preview" />}
            </div>

            <div className="col-12">
              <label className="form-label"><strong>Details</strong></label>
              <Editor
                tinymceScriptSrc="/tinymce/tinymce.min.js"
                onEditorChange={(newValue) => setValue('body', newValue)}
                value={watch('body')}
                init={tinyMCEInit}
              />
            </div>
          </div>
          
          <div className="d-flex gap-2 my-3 justify-content-end">
            <Button variant="primary" size="sm" onClick={handleClose}>Close</Button>
          <Button variant="secondary" size="sm" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <PulseLoader loading={isSubmitting} color="#ffffff" size="0.7rem" /> : 'Update Service'}
          </Button>
          </div>
      </form>
      </ModalComponent>    
  );
};

export default React.memo(EditServiceModal);
