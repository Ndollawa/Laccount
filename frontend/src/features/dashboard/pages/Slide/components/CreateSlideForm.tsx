import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
import showToast from '../../../../../app/utils/showToast';
import { useUpdateSlideSettingMutation } from '../../Settings/slices/settingApi.slice';
import { useSelector } from 'react-redux';
import { useLandingConfig } from '../../Settings/slices/settings.slice';
import { PulseLoader } from 'react-spinners';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL;

interface FormInputs {
  title: string;
  description: string;
  body: string;
  status: string;
  cto_text?: string;
  link?: string;
  image: File | null;
}

const CreateSlideForm = () => {
  const {id, settings: { sliders } = {} } = useSelector(useLandingConfig);
  
  const [addCTOToggle, setAddCTOToggle] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [updateSlideSetting, { isLoading, isSuccess, isError, error }] = useUpdateSlideSettingMutation();
  
  const [show, setShow] = useState(false);
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, reset, watch } = useForm<FormInputs>({
    defaultValues: {
      title: '',
      description: '',
      body: '',
      status: 'active',
      image: null,
      cto:{
        cto_text: '',
        link: '',
    }
    },
  });

  // Reset form when successfully submitted
  React.useEffect(() => {
    if (isSuccess) {
      reset();
      showToast('success', 'Slide created successfully');
      setPreviewImage('');
      setAddCTOToggle(false);
    }
    if (isError) {
       showToast('error', error?.message);
  ;
    }
  }, [isSuccess,isError, reset]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateSettings: SubmitHandler<FieldValues> = async (formFields, e) => {
    e?.preventDefault()
console.log(formFields.image)
const formData = new FormData();
    formData.append("id", id);
    formData.append("type", "create");
    formData.append("image", formFields.image);
    formData.append("slide", JSON.stringify(formFields));
   
      // await updateSlideSetting({id, type:"create", slide:formFields, file: formFields.image});
    await updateSlideSetting(formData);
     };

  const uploadBg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewImage(fileUrl);
    }
  };

  return (
    <>
      <button type="button" className="btn btn-primary btn-sm mb-2" onClick={handleShow}>Add New</button>

      <Modal show={show} size="lg" centered backdrop='static' onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Slide</Modal.Title>
        </Modal.Header>

        <form onSubmit={(e) => handleSubmit(updateSettings)(e) } encType="multipart/form-data">
          <Modal.Body>
            <div className="card-body">
              <div className="basic-form">
                <div className="row">
                  {/* Title */}
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

                  {/* Status */}
                  <div className="mb-3 col-md-3">
                    <label className="form-label"><strong>Status</strong></label>
                    <select
                      id="status"
                      className={`form-control default-select form-control wide ${errors.status ? 'is-invalid' : ''}`}
                      {...register('status',{required:"Status is required"})}
                    >
                      <option value='active'>Active</option>
                      <option value='inactive'>Inactive</option>
                    </select>
                    <div className="invalid-feedback">{errors.status?.message}</div>
                  </div>

                  {/* Description */}
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

                  {/* Background Image */}
                  <div className="col-md-6">
                    <label className="form-label">Background Image</label>
                    <div className="input-group mb-3">
                      <div className="form-file">
                        <input
                          type="file"
                          accept=".jpeg, .jpg, .png, .gif"
                          onChange={uploadBg}
                          className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                        />
                      </div>
                      <span className="input-group-text">Upload</span>
                    </div>
                    <div className="invalid-feedback">{errors.image?.message}</div>
                  </div>

                  {/* Preview */}
                  <div className="col-md-6">
                    <label className="form-label">Preview</label>
                    <div id="preview">
                      {previewImage && <img className="img-responsive" src={previewImage} alt="Preview" width="240" />}
                    </div>
                  </div>

                  {/* CTO Toggle */}
                  <div className="my-20 col-md-12 d-flex justify-content-between">
                    <strong>Add CTO Button</strong>
                    <label className='p-10' htmlFor="addCTOToggle">
                      {addCTOToggle ? <BsToggleOn className='text-primary' fontSize={'2rem'} /> : <BsToggleOff className='text-default' fontSize={'2rem'} />}
                    </label>
                    <input
                      type="checkbox"
                      id="addCTOToggle"
                      className="setting-checkbox d-none"
                      onClick={() => setAddCTOToggle((prev) => !prev)}
                    />
                  </div>

                  {/* CTO Text and Link */}
                  {addCTOToggle && (
                    <>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label"><strong>CTO Text</strong></label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter CTO text"
                            {...register('cto.cto_text')}
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label"><strong>Link</strong></label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter link"
                            {...register('cto.link')}
                          />
                          <div className="invalid-feedback">{errors.link?.message}</div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Body */}
                  <div className="col-12">
                    <label className="form-label"><strong>Body</strong></label>
                    <Editor
                      tinymceScriptSrc={'/tinymce/tinymce.min.js'}
                      onEditorChange={(newValue) => setValue('body', newValue)}
                      value={watch('body')}
                      init={{
                        height: 400,
                        menubar: false,
                        plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'],
                        toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" size='sm' className='rounded-md' onClick={handleClose}>
              Close
            </Button>
            <Button variant="secondary" size="sm" type="submit" className="rounded-md" >
            {isSubmitting ? (
                          <>
                           {/* <span> Updating</span> */}
                            <PulseLoader loading={isSubmitting} color="#ffffff" size="0.7rem" />
                          </>
                        ) : (
                          'Create Slide'
                        )}  
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default React.memo(CreateSlideForm);
