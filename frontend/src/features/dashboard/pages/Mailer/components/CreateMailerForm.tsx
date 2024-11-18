import React , { useEffect, useState, useCallback } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { Button } from 'react-bootstrap';
import { PulseLoader } from 'react-spinners';
import { Editor } from '@tinymce/tinymce-react';
import { useAddNewMailerMutation } from '../slices/mailerApi.slice';
import showToast from '@utils/showToast';
import handleApiErrors from '@utils/handleApiErrors';
import tinyMCEInit from '@configs/tinymce.config';
import useWindowSize from '@hooks/useWindowSize';
import ModalComponent from '@dashboard/components/Modal';
import FileUpload from '@components/FileUpload';

type FormValues = {
  title: string;
  icon: string;
  description: string;
  body: string;
  status: string;
  image: FileList;
};

const CreateMailerForm = () => {
  const { register, handleSubmit, watch, setValue, setError, reset, formState: { errors, isSubmitting } } = useForm<FormValues>();
  const [addNewMailer, { isLoading, isSuccess, isError, error }] = useAddNewMailerMutation();
  const [previewImage, setPreviewImage] = React.useState<string>("");
  const {width} = useWindowSize()
  const [show, setShow] = useState(false);
  const handleOpen = useCallback(() => setShow(true), [show]);
  const handleClose = useCallback(() => setShow(false), [show]);


    useEffect(() => {
    if (isSuccess) {
      reset();
      setPreviewImage("")
      showToast('success', 'Mailer created successfully');
    }
    if (isError) {
      handleApiErrors(error, setError);
    }
  }, [isSuccess, isError, reset, error]);

  const onSubmit: SubmitHandler<FieldValues> = async (formFields, e) => {
    e?.preventDefault()
    const formData = new FormData();
    formData.append("title", formFields.title);
    formData.append("icon", formFields.icon);
    formData.append("description", formFields.description);
    formData.append("body", formFields.body);
    formData.append("status", formFields.status);
    formData.append("file", formFields.image[0]);

    await addNewMailer(formData);
  };

  const uploadBg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file.length > 0) {
      setValue("image", file);
      const fileUrl = URL.createObjectURL(file[0]);
      setPreviewImage(fileUrl);
    }
  };

  return (
    <>
      <button type="button" className="btn btn-primary mb-2" onClick={handleOpen}>
        Add New
      </button>

          <ModalComponent {...{size:((width as  number)< 600)? "xl": "lg", header:{show:true,title:'Add New Mailer'},modalStates:{show,handleOpen,handleClose}}} >
					
        <form onSubmit={(e) => handleSubmit(onSubmit)(e) } encType="multipart/form-data">
            <div className="card-body">
              <div className="basic-form">
                <div className="row">
                  <div className="mb-3 col-md-7">
                    <label className="form-label"><strong>Name or Title</strong></label>
                    <input
                      type="text"
                      className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                      {...register('title', { required: 'Title is required' })}
                    />
                    {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
                  </div>

                  <div className="mb-3 col-md-3">
                    <label className="form-label"><strong>Icon Class</strong></label>
                    <input
                      type="text"
                      className={`form-control ${errors.icon ? 'is-invalid' : ''}`}
                      {...register('icon', { required: 'Icon is required' })}
                    />
                    {errors.icon && <div className="invalid-feedback">{errors.icon.message}</div>}
                  </div>

                  <div className="mb-3 col-md-2">
                    <label className="form-label"><strong>Status</strong></label>
                    <select
                      className="form-control"
                      {...register('status')}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="mb-3 col-md-12">
                    <label className="form-label"><strong>Description</strong></label>
                    <input
                      type="text"
                      className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                      {...register('description', { required: 'Description is required' })}
                    />
                    {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                  </div>

                  <div className="col-md-6">
                 <FileUpload onChange={uploadBg}/>

                    {errors.image && <div className="invalid-feedback">Background image is required</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label block w-100">Preview </label>
                    {previewImage && <img src={previewImage} alt="Preview" width="240" />}
                  </div>

                  <div className="col-12">
                    <label className="form-label"><strong>Details</strong></label>
                    <Editor
                      tinymceScriptSrc="/tinymce/tinymce.min.js"
                      onEditorChange={(newValue) => setValue("body", newValue)}
                      init={tinyMCEInit}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex gap-2 my-3 justify-content-end">
            <Button variant="primary" size="sm" onClick={handleClose}>Close</Button>
          <Button variant="secondary" size="sm" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <PulseLoader loading={isSubmitting} color="#ffffff" size="0.7rem" /> : 'Create Mailer'}
          </Button>
          </div>
        </form>
        </ModalComponent>
    </>
  );
};

export default CreateMailerForm;
