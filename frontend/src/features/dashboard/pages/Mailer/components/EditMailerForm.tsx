import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
import { PulseLoader } from 'react-spinners';
import { Modal, Button } from 'react-bootstrap';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
import showToast from '@utils/showToast';
import { HomeMailer } from '@props/settingsProps';
import { useUpdateMailerSettingMutation } from '../../Settings/slices/settingApi.slice';
import { useLandingConfig } from '../../Settings/slices/settings.slice';
import { ModalDataProps } from '@props/modalProps';

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface FormInputs {
  type : MailerTemplateEnum;
  template : string;
  body     : string;
  name     : string;
  data    :  object;
  status :   MailerTemplateStatus;
}

const EditMailerModal = ({ modalData: { data, showModal } }: ModalDataProps<Mailer>) => {
  const { id } = useSelector(useLandingConfig, shallowEqual);
  const [addCTOToggle, setAddCTOToggle] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>('');

  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, reset, watch } = useForm<FormInputs>({
    defaultValues: {
      title: '',
      description: '',
      body: '',
      status: '',
      cto: {},
      image: null,
    },
  });

  const [updateMailerSetting, { isLoading, isSuccess, isError, error }] = useUpdateMailerSettingMutation();
  const [show, setShow] = useState(false);
  useEffect(() => {
    // When `data` is available, reset form fields with the new default values
    if (data) {
      setShow(true)
      reset({
        title: data.title || '',
        description: data.description || '',
        body: data.body || '',
        status: data.status || 'active',
        cto: data.cto || {},
        image: null,
      });
      if(Object.values(data?.cto ?? {})?.length ){
        setAddCTOToggle(true);
      }
      // Set preview image if available
      if (data.image) {
        setPreviewImage(`${BASE_URL}uploads/settings/mailers/${data.image}`);
      }
    }
  }, [data, reset]);
  useEffect(() => {
    if (isSuccess) {
         reset();
      setPreviewImage('');
      setAddCTOToggle(false);
      showToast('success', 'Mailer updated successfully');
      
      }
      if (isError) {
        showToast('error', error?.message);
      }
      }, [isSuccess, isError]);

  const handleClose = useCallback(() => setShow(false), [show]);
  const updateSettings: SubmitHandler<FieldValues> = useCallback(async (formFields, e) => {
    e?.preventDefault();
    
    const formData = new FormData();
    formData.append('id', id);
    formData.append('type', 'update');
    formData.append('image', formFields.image);
    formData.append('mailer', JSON.stringify(formFields));
    
   
      await updateMailerSetting(formData);
  },
   [id, updateMailerSetting]);

  const uploadBg = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('image', file);
      setPreviewImage(URL.createObjectURL(file));
    }
  }, [setValue]);

  return (
    <Modal show={show} size="lg" centered backdrop="static" onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Mailer</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(updateSettings)} encType="multipart/form-data">
        <Modal.Body>
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
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
              <label className="form-label">Background Image</label>
              <input
                type="file"
                accept=".jpeg, .jpg, .png, .gif"
                onChange={uploadBg}
                className={`form-control ${errors.image ? 'is-invalid' : ''}`}
              />
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
              init={{
                height: 400,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap anchor searchreplace visualblocks code fullscreen insertdatetime media table preview help wordcount',
                ],
                toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" size="sm" onClick={handleClose}>Close</Button>
          <Button variant="secondary" size="sm" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <PulseLoader loading={isSubmitting} color="#ffffff" size="0.7rem" /> : 'Update Mailer'}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default React.memo(EditMailerModal);    
