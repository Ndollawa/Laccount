import React, { useEffect, useState, useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Modal, Button } from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';
import { useUpdateServiceMutation } from '../slices/servicesApi.slice';
import showToast from '../../../../../app/utils/showToast';
import serviceProps from '../../../../../app/props/serviceProps';

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface FormInputs {
  title: string;
  icon: string;
  description: string;
  body: string;
  status: string;
  image: File | null;
}

interface ModalDataProps {
  modalData: {
    data: serviceProps | null;
    showModal: boolean;
  };
}

const EditServiceModal = ({ modalData: { data, showModal } }: ModalDataProps) => {
  const [previewImage, setPreviewImage] = useState<string>(`${BASE_URL}/uploads/settings/service/${data?.image}`);
  const [updateService, { isLoading, isSuccess, isError, error }] = useUpdateServiceMutation();
  const { register, handleSubmit, setValue, reset, formState: { errors, isSubmitting }, watch } = useForm<FormInputs>({
    defaultValues: {
      title: data?.title,
      icon: data?.icon,
      description: data?.description,
      body: data?.body,
      status: data?.status,
      image: null,
    },
  });

  useEffect(() => {
    if (isSuccess) {
      reset();
      showToast('success', 'Service updated successfully');
      setPreviewImage('');
    }
    if (isError) {
      showToast('error', error?.message);
    }
  }, [isSuccess, isError, reset, error]);

  useEffect(() => {
    if (data?.image) {
      setPreviewImage(`${BASE_URL}/uploads/settings/service/${data?.image}`);
    }
  }, [data?.image]);

  const uploadBg = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('upload', file);
      setPreviewImage(URL.createObjectURL(file));
    }
  }, [setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (formFields, e) => {
    e?.preventDefault()
    const formData = new FormData();
    formData.append('id', data?.id!);
    formData.append('title', formFields.title);
    formData.append('icon', formFields.icon);
    formData.append('description', formFields.description);
    formData.append('body', formFields.body);
    formData.append('status', formFields.status);
    formData.append('file', formFields.image!);

    await updateService(formData);
  };

  return (
    <Modal show={showModal} size="lg" centered backdrop="static" onHide={() => setShow(false)} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Service</Modal.Title>
      </Modal.Header>
      <form onSubmit={(e) => handleSubmit(onSubmit)(e) } encType="multipart/form-data">
        <Modal.Body>
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
              <label className="form-label">Preview</label>
              {previewImage && <img className="img-responsive" src={previewImage} alt="Preview" width="240" />}
            </div>

            <div className="col-12">
              <label className="form-label"><strong>Details</strong></label>
              <Editor
                tinymceScriptSrc="/tinymce/tinymce.min.js"
                onEditorChange={(newValue) => setValue('body', newValue)}
                value={watch('body')}
                init={{
                  height: 400,
                  menubar: true,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                  ],
                  toolbar: 'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="secondary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Service'}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default React.memo(EditServiceModal);
