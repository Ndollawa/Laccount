import React , { useEffect, useState, useCallback } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { Button } from 'react-bootstrap';
import { PulseLoader } from 'react-spinners';
import { Editor } from '@tinymce/tinymce-react';
import { useAddNewFaqMutation } from '../slices/faqApi.slice';
import showToast from '@utils/showToast';
import handleApiErrors from '@utils/handleApiErrors';
import tinyMCEInit from '@configs/tinymce.config';
import useWindowSize from '@hooks/useWindowSize';
import ModalComponent from '@dashboard/components/Modal';

type FormValues = {
  question: string;
  response: string;
  status: string;
};

const CreateFaqForm = () => {
  const { register, handleSubmit, watch, setError, setValue, reset, formState: { errors, isSubmitting } } = useForm<FormValues>(
    {
      defaultValues:{
        question:'',
        status:'',
        response:''
      }
    }
  );
  const [addNewFaq, { isLoading, isSuccess, isError, error }] = useAddNewFaqMutation();
  const {width} = useWindowSize()
  const [show, setShow] = useState(false);
  const handleOpen = useCallback(() => setShow(true), [show]);
  const handleClose = useCallback(() => setShow(false), [show]);

    useEffect(() => {
    if (isSuccess) {
      reset();
      showToast('success', 'Faq created successfully');
    }
    if (isError) {
      handleApiErrors(error, setError);
    }
  }, [isSuccess, isError, reset, error]);

  const onSubmit: SubmitHandler<FieldValues> = async (formFields, e) => {
    e?.preventDefault()
    await addNewFaq(formFields);

  };

 
  return (
    <>
      <button type="button" className="btn btn-primary mb-2" onClick={handleOpen}>
        Add New
      </button>

          <ModalComponent {...{size:((width as  number)< 600)? "xl": "lg", header:{show:true,title:'Add New Faq'},modalStates:{show,handleOpen,handleClose}}} >
					
        <form onSubmit={(e) => handleSubmit(onSubmit)(e) }>
            <div className="card-body">
              <div className="basic-form">
                <div className="row">
                  <div className="mb-3 col-md-9">
                    <label className="form-label"><strong>Question</strong></label>
                    <input
                      type="text"
                      className={`form-control ${errors.question ? 'is-invalid' : ''}`}
                      {...register('question', { required: 'Question is required' })}
                    />
                    {errors.question && <div className="invalid-feedback">{errors.question.message}</div>}
                  </div>

                 <div className="mb-3 col-md-3">
                    <label className="form-label"><strong>Status</strong></label>
                    <select
                      className={`form-control ${errors.status ? 'is-invalid' : ''}`}
                      {...register('status',{
                        required:'Status is required'
                      })}
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Inactive</option>
                    </select>
                      {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
                  </div>

                  <div className="col-12">
                    <label className="form-label"><strong>Response / Answer</strong></label>
                    <Editor
                      tinymceScriptSrc="/tinymce/tinymce.min.js"
                      onEditorChange={(newValue) => setValue("response", newValue)}
                      {...register('response',{
                        required:'Response / Answer is required '
                      })}
                      init={tinyMCEInit}
                    />
                      {errors.response && <div className="invalid-feedback">{errors.response.message}</div>}
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex gap-2 my-3 justify-content-end">
            <Button variant="primary" size="sm" onClick={handleClose}>Close</Button>
          <Button variant="secondary" size="sm" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <PulseLoader loading={isSubmitting} color="#ffffff" size="0.7rem" /> : 'Create Faq'}
          </Button>
          </div>
        </form>
        </ModalComponent>
    </>
  );
};

export default CreateFaqForm;
