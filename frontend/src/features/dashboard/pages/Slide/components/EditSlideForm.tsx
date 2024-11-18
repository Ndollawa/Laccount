import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
import { PulseLoader } from 'react-spinners';
import { Button } from 'react-bootstrap';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
import showToast from '@utils/showToast';
import handleApiErrors from '@utils/handleApiErrors';
import tinyMCEInit from '@configs/tinymce.config';
import { HomeSlide } from '@props/settingsProps';
import { useUpdateSlideSettingMutation } from '../../Settings/slices/settingApi.slice';
import { useLandingConfig } from '../../Settings/slices/settings.slice';
import { ModalDataProps } from '@props/modalProps';
import useWindowSize from '@hooks/useWindowSize';
import ModalComponent from '@dashboard/components/Modal';
import FileUpload from '@components/FileUpload';

const SLIDER_ASSETS = import.meta.env.VITE_SLIDER_ASSETS;

interface FormInputs {
  title: string;
  description: string;
  body: string;
  status: string;
 cto:{
   cto_text?: string;
  link?: string;
 }
  image: File | null;
}

const EditSlideModal = ({ modalData: { data, showModal } }: ModalDataProps<HomeSlide>) => {
  const { id } = useSelector(useLandingConfig, shallowEqual);
  const [addCTOToggle, setAddCTOToggle] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [show, setShow] = useState(false);
  const {width} = useWindowSize()
  const handleOpen = useCallback(() => setShow(true), [show]);
  const handleClose = useCallback(() => setShow(false), [show]);

  const { register, handleSubmit, setError, formState: { errors, isSubmitting }, setValue, reset, watch } = useForm<FormInputs>({
    defaultValues: {
      title: '',
      description: '',
      body: '',
      status: '',
      cto: {link:"",cto_text:""},
      image: null,
    },
  });

  const [updateSlideSetting, { isLoading, isSuccess, isError, error }] = useUpdateSlideSettingMutation();
  useEffect(() => {
    // When `data` is available, reset form fields with the new default values
    if (data) {
      setShow(showModal)
      reset({
        title: data.title || '',
        description: data.description || '',
        body: data.body || '',
        status: data.status || 'ACTIVE',
        cto: data.cto || {},
        image: null,
      });
      if(Object.values(data?.cto ?? {})?.length ){
        setAddCTOToggle(true);
      }
      // Set preview image if available
      if (data.image) {
        setPreviewImage(`${SLIDER_ASSETS}${data.image}`);
      }
    }
  }, [data, reset]);
  useEffect(() => {
    if (isSuccess) {
         reset();
      setPreviewImage('');
      setAddCTOToggle(false);
      showToast('success', 'Slide updated successfully');
      
      }
      if (isError) {
        handleApiErrors(error, setError)
      }
      }, [isSuccess, isError]);
  const updateSettings: SubmitHandler<FieldValues> = useCallback(async (formFields, e) => {
    e?.preventDefault();
    
    const formData = new FormData();
    formData.append('id', id);
    formData.append('type', 'update');
    formData.append('image', formFields.image);
    formData.append('slide', JSON.stringify(formFields));
    
   
      await updateSlideSetting(formData);
  },
   [id, updateSlideSetting]);

  const uploadBg = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('image', file);
      setPreviewImage(URL.createObjectURL(file));
    }
  }, [setValue]);

  return (
      
    <ModalComponent {...{size:((width as number) < 600)? "xl": "lg", header:{show:true,title:'Edit Slide'},modalStates:{show,handleOpen,handleClose}}} >
      <form onSubmit={handleSubmit(updateSettings)} encType="multipart/form-data">
          <div className="row">
            <div className="mb-3 col-md-9">
              <label className="form-label"><strong>Title or Heading</strong></label>
              <input
                type="text"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                placeholder="Enter title"
                {...register('title', { required: 'Title is required' })}
              />
              <div className="invalid-feedback">{errors.title?.message}</div>
            </div>
            <div className="mb-3 col-md-3">
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
                placeholder="Enter description"
                {...register('description', { required: 'Description is required' })}
              />
              <div className="invalid-feedback">{errors.description?.message}</div>
            </div>
            <div className="col-md-6">
             <FileUpload onChange={uploadBg}/>
              <div className="invalid-feedback">{errors.image?.message}</div>
            </div>
            <div className="col-md-6">
              <label className="form-label block ">Preview</label>
              <div id="preview">
              {previewImage && <img className="img-responsive" src={previewImage} alt="Preview" width="240" />}
              </div>
            </div>
          </div>
          <div className="my-20 col-md-12 d-flex justify-content-between">
            <strong>Add CTO Button</strong>
            <label className="p-10" htmlFor="addCTOToggle">
              { addCTOToggle ? <BsToggleOn className="text-primary" fontSize="2rem" /> : <BsToggleOff className="text-default" fontSize="2rem" />}
            </label>
            <input
              type="checkbox"
              id="addCTOToggle"
              className="d-none"
              onChange={() => setAddCTOToggle(prev => !prev)}
            />
          </div>
          { addCTOToggle && (
            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="form-label"><strong>CTO Text</strong></label>
                <input type="text" className="form-control" placeholder="Enter CTO text" {...register('cto.cto_text')} />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label"><strong>Link</strong></label>
                <input type="text" className="form-control" placeholder="Enter link" {...register('cto.link')} />
              </div>
            </div>
          )}
          <div className="col-12">
            <label className="form-label"><strong>Body</strong></label>
            <Editor
              tinymceScriptSrc="/tinymce/tinymce.min.js"
              onEditorChange={(newValue) => setValue('body', newValue)}
              value={watch('body')}
              init={tinyMCEInit}
            />
          </div>
          <div className="d-flex gap-2 my-3 justify-content-end">
            <Button variant="primary" size="sm" onClick={handleClose}>Close</Button>
          <Button variant="secondary" size="sm" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <PulseLoader loading={isSubmitting} color="#ffffff" size="0.7rem" /> : 'Update Slide'}
          </Button>
          </div>
      </form>
    </ModalComponent>      
  );
};

export default React.memo(EditSlideModal);    
