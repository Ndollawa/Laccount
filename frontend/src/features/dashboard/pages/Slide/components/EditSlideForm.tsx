import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
import { PulseLoader } from 'react-spinners';
import { Modal, Button } from 'react-bootstrap';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
import showToast from '../../../../../app/utils/showToast';
import { HomeSlide } from '../../../../../app/props/settingsProps';
import { useUpdateSlideSettingMutation } from '../../Settings/slices/settingApi.slice';
import { useLandingConfig } from '../../Settings/slices/settings.slice';
import { ModalDataProps } from '../../../../../app/props/modalProps';

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface FormInputs {
  title: string;
  description: string;
  body: string;
  status: string;
  cto_text?: string;
  link?: string;
  image: File | null;
}



const EditSlideModal = ({ modalData: { data, showModal } }: ModalDataProps<HomeSlide>) => {
  const { id, settings: { sliders } = {} } = useSelector(useLandingConfig, shallowEqual);

  const [addCTOToggle, setAddCTOToggle] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [show, setShow] = useState(showModal);

  const [updateSlideSetting, { isLoading, isSuccess, isError, error }] = useUpdateSlideSettingMutation();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, reset, watch } = useForm<FormInputs>({
    defaultValues: {
      title: data?.title,
      description: data?.description,
      body: data?.body,
      status: data?.status,
      cto:data?.cto,
      image: null,
    },
  });
console.log(showModal)
  useEffect(() => {
    if (data?.image) {
      setPreviewImage(`${BASE_URL}uploads/settings/slides/${data.image}`);
    }
  }, [data?.image]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      showToast('success', 'Slide updated successfully');
      setPreviewImage('');
      setAddCTOToggle(false);
    }
    if (isError) {
      showToast('error', error?.message);
    }
  }, [isSuccess, isError, reset, error]);

  const handleClose = useCallback(() => setShow(false), []);
  const handleShow = useCallback(() => setShow(true), []);

  const updateSettings: SubmitHandler<FieldValues> = useCallback(async (formFields, e) => {
    e?.preventDefault();

    const formData = new FormData();
    formData.append("id", id);
    formData.append("type", "update");
    formData.append("image", formFields.image);
    formData.append("slide", JSON.stringify(formFields));

    await updateSlideSetting(formData);
  }, [id, updateSlideSetting]);

  const uploadBg = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      setPreviewImage(URL.createObjectURL(file));
    }
  }, [setValue]);

  return (
    <Modal show={show} size="lg" centered backdrop="static" onHide={() => setShow(false)} animation={false}>
    <Modal.Header closeButton>
      <Modal.Title>Edit Slide</Modal.Title>
    </Modal.Header>
      <form onSubmit={handleSubmit(updateSettings)} encType="multipart/form-data">
        <Modal.Body>
          {/* Form Fields */}
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
                id="status"
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
              <label className="form-label">Preview</label>
              {previewImage && <img className="img-responsive" src={previewImage} alt="Preview" width="240" />}
            </div>
          </div>

          {/* CTO Section */}
          <div className="my-20 col-md-12 d-flex justify-content-between">
            <strong>Add CTO Button</strong>
            <label className="p-10" htmlFor="addCTOToggle">
              {addCTOToggle ? <BsToggleOn className="text-primary" fontSize="2rem" /> : <BsToggleOff className="text-default" fontSize="2rem" />}
            </label>
            <input
              type="checkbox"
              id="addCTOToggle"
              className="d-none"
              onChange={() => setAddCTOToggle(prev => !prev)}
            />
          </div>

          {addCTOToggle && (
            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="form-label"><strong>CTO Text</strong></label>
                <input type="text" className="form-control" placeholder="Enter CTO text" {...register('cto_text')} />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label"><strong>Link</strong></label>
                <input type="text" className="form-control" placeholder="Enter link" {...register('link')} />
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
          <Button variant="primary" size="sm" onClick={handleClose}>
            Close
          </Button>
          <Button variant="secondary" size="sm" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <PulseLoader loading={isSubmitting} color="#ffffff" size="0.7rem" /> : 'Update Slide'}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default React.memo(EditSlideModal);
