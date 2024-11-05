import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
import showToast from '@utils/showToast';
import { useUpdateMailerSettingMutation } from '../../Settings/slices/settingApi.slice';
import { PulseLoader } from 'react-spinners';
import { MailerTemplateEnum, MailerTemplateStatus } from '@props/mailerProps';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL;

interface FormInputs {
  type : MailerTemplateEnum;
  template : string;
  body     : string;
  name     : string;
  data    :  object;
  status :   MailerTemplateStatus;
}

const CreateMailerForm = () => {
  const [updateMailerSetting, { isLoading, isSuccess, isError, error }] = useUpdateMailerSettingMutation();
  
  const [show, setShow] = useState(false);
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, reset, watch } = useForm<FormInputs>({
    defaultValues: {
      type: undefined,
      template: '',
      body: '',
      status: undefined,
      name: '',
      data:{}
    },
  });

  // Reset form when successfully submitted
  React.useEffect(() => {
    if (isSuccess) {
      reset();
      showToast('success', 'Mailer created successfully');
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
    formData.append("type", formFields.type);
    formData.append("name", formFields.name);
    formData.append("body", formFields.body);
    formData.append("template", formFields.template);
    formData.append("status", formFields.status);
    formData.append("data", JSON.stringify(formFields.data));
   
      // await updateMailerSetting({id, type:"create", mailer:formFields, file: formFields.image});
    await updateMailerSetting(formData);
     };

  

  return (
    <>
      <button type="button" className="btn btn-primary btn-sm mb-2" onClick={handleShow}>Add New</button>

      <Modal show={show} size="lg" centered backdrop='static' onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Mailer</Modal.Title>
        </Modal.Header>

        <form onSubmit={(e) => handleSubmit(updateSettings)(e) } encType="multipart/form-data">
          <Modal.Body>
            <div className="card-body">
              <div className="basic-form">
                <div className="row">
                  {/* Title */}
                  <div className="mb-3 col-md-9">
                    <label className="form-label"><strong>Title</strong></label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      placeholder="Enter name"
                      {...register('name', { required: 'Name is required' })}
                    />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                  </div>

                  {/* Status */}
                  <div className="mb-3 col-md-3">
                    <label className="form-label"><strong>Status</strong></label>
                    <select
                      id="status"
                      className={`form-control default-select form-control wide ${errors.status ? 'is-invalid' : ''}`}
                      {...register('status',{required:"Status is required"})}
                    >
                      <option value={
                      MailerTemplateStatus.ACTIVE
                    }>Active</option>
                      <option value={ MailerTemplateStatus.INACTIVE }>Inactive</option>
                      {/* <option value={ MailerTemplateStatus.ARCHIVED }>Archive</option> */}
                    </select>
                    <div className="invalid-feedback">{errors.status?.message}</div>
                  </div>
                  {/* Type */}
                  <div className="mb-3 col-md-3">
                    <label className="form-label"><strong>Type</strong></label>
                    <select
                      id="type"
                      className={`form-control default-select form-control wide ${errors.type ? 'is-invalid' : ''}`}
                      {...register('type',{required:"Type is required"})}
                    >
                      <option value={MailerTemplateEnum.DEFAULT}>Default</option>
                      <option value={MailerTemplateEnum.NEWSLETTER}>News Letter</option>
                      <option value={MailerTemplateEnum.ACCOUNT_VERIFICATION}>Account Verifcation</option>
                      <option value={MailerTemplateEnum.LOGIN_CONFIRMATION}>Login Confirmation</option>
                      <option value={MailerTemplateEnum.SIGNUP_CONFIRMATION}>Signup Confirmation</option>
                      <option value={MailerTemplateEnum.SUBSCRIPTION_RENEWAL}>Subscription Renewal</option>
                      <option value={MailerTemplateEnum.PASSWORD_RESET}>Password Reset</option>
                      <option value={MailerTemplateEnum.PROMOTIONAL_OFFER}>Promotional Offer</option>
                      <option value={MailerTemplateEnum.SYSTEM_NOTIFICATION}>System Notification</option>
                      <option value={MailerTemplateEnum.PAYMENT_RECEIPT}>Payment Reciepts</option>
                      {/* <option value={MailerTemplateEnum.ACCOUNT_VERIFICATION}>Account Verifcation</option> */}
                    </select>
                    <div className="invalid-feedback">{errors.type?.message}</div>
                  </div>

                  {/* Data */}
                  <div className="mb-3 col-md-12">
                    <label className="form-label"><strong>Data/Context</strong></label>
                    <textarea
                    row={5}
                      className={`form-control ${errors.data ? 'is-invalid' : ''}`}
                      placeholder="Enter data"
                      {...register('data', { required: 'Data is required' })}
                   ></textarea>
                    <div className="invalid-feedback">{errors.data?.message}</div>
                  </div>

                
                  {/* Template */}
                  <div className="col-12">
                    <label className="form-label"><strong>Template</strong></label>
                    <Editor
                      tinymceScriptSrc={'/tinymce/tinymce.min.js'}
                      onEditorChange={(newValue) => setValue('template', newValue)}
                      value={watch('template')}
                      init={{
                        height: 400,
                        menubar: false,
                        plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'],
                        toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                      }}
                    />
                  </div>
                
                  {/* Body */}
                  <div className="col-12">
                    <label className="form-label"><strong>Body</strong></label>
                    <Editor
                      tinymceScriptSrc={'/tinymce/tinymce.min.js'}
                      // skin={'dark'}
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
                    <div className="invalid-feedback">{errors.body?.message}</div>
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
                          'Create Mailer'
                        )}  
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default React.memo(CreateMailerForm);
