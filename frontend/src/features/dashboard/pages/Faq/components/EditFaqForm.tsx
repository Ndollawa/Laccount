import React, { useEffect, useState, useCallback } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { Button } from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';
import { PulseLoader } from 'react-spinners';
import { useUpdateFaqMutation } from '../slices/faqApi.slice';
import showToast from '@utils/showToast';
import handleApiErrors from '@utils/handleApiErrors';
import tinyMCEInit from '@configs/tinymce.config';
import FaqProps from '@props/FaqProps';
import useWindowSize from '@hooks/useWindowSize';
import ModalComponent from '@dashboard/components/Modal';
import { ModalDataProps } from '@props';

interface FormInputs {
  question: string;
  response: string;
  status: string;
}


const EditFaqModal = ({ modalData: { data, showModal } }: ModalDataProps<FaqProps>) => {
  const [updateFaq, { isLoading, isSuccess, isError, error }] = useUpdateFaqMutation();
  const {width} = useWindowSize()

  const [show, setShow] = useState(false);
  const handleOpen = useCallback(() => setShow(true), [show]);
  const handleClose = useCallback(() => setShow(false), [show]);
  const { register, handleSubmit, setError, setValue, reset, formState: { errors, isSubmitting }, watch } = useForm<FormInputs>();
  useEffect(() => {
    // When `data` is available, reset form fields with the new default values
    if (data) {
      setShow(showModal)
      // setId(data.id)
      reset({
      question: data?.question,
      response: data?.response,
      status: data?.status,
         });
        }
  }, [data, reset]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      showToast('success', 'Faq updated successfully');
    }
    if (isError) {
      handleApiErrors(error, setError);
    }
  }, [isSuccess, isError, reset, error]);

  const onSubmit: SubmitHandler<FieldValues> = async (formFields, e) => {
    e?.preventDefault()
    await updateFaq({...formFields, id:data.id});
  };

  return (
    <ModalComponent {...{size:((width as number) < 600)? "xl": "lg", header:{show:true,title:'Edit Faq'},modalStates:{show,handleOpen,handleClose}}} >
      <form onSubmit={(e) => handleSubmit(onSubmit)(e) }>
          <div className="row">
            <div className="mb-3 col-md-9">
              <label className="form-label"><strong>Question</strong></label>
              <input
                type="text"
                className={`form-control ${errors.question ? 'is-invalid' : ''}`}
                {...register('question', { required: 'Question is required' })}
              />
              <div className="invalid-feedback">{errors.question?.message}</div>
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

            <div className="col-12">
              <label className="form-label"><strong>Response / Answer</strong></label>
              <Editor
                tinymceScriptSrc="/tinymce/tinymce.min.js"
                onEditorChange={(newValue) => setValue('response', newValue)}
                value={watch('response')}
                init={tinyMCEInit}
              />
            </div>
          </div>
          
          <div className="d-flex gap-2 my-3 justify-content-end">
            <Button variant="primary" size="sm" onClick={handleClose}>Close</Button>
          <Button variant="secondary" size="sm" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <PulseLoader loading={isSubmitting} color="#ffffff" size="0.7rem" /> : 'Update Faq'}
          </Button>
          </div>
      </form>
      </ModalComponent>    
  );
};

export default React.memo(EditFaqModal);
