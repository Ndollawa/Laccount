import React, { useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useDispatch,useSelector } from 'react-redux';
import { BsInfoCircleFill } from 'react-icons/bs';
import { PulseLoader } from 'react-spinners';
import { useUpdateSettingMutation } from '../slices/settingApi.slice';
import { setLandingSetting, useLandingConfig } from '../slices/settings.slice';
import showToast from '@utils/showToast';
import tinyMCEInit from '@configs/tinymce.config';

const TermsCondition = () => {

  const dispatch = useDispatch();
  const [updateSetting, isLoading] = useUpdateSettingMutation();
  const landingConfig = useSelector(useLandingConfig);
  const { id, settings: { pages, ...otherSettings }} = landingConfig;
  const initialState = {
    termsCondition:pages? pages?.termsCondition : "",
  };
  
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialState,
  });
  
  // Watch form fields
  const termsConditionValue = watch('termsCondition');

  useEffect(() => {
    // Initialize the value in TinyMCE editor
    setValue('termsCondition', initialState.termsCondition);
  }, [setValue, initialState.termsCondition]);
  const updateSettings:SubmitHandler<FieldValues> = async(formFields, e)=>{
  e.preventDefault()
  try {
    const settings = {pages:{...pages, ...formFields}, ...otherSettings}
    await updateSetting({id, settings}).unwrap()
     dispatch(setLandingSetting({ ...landingConfig, settings }))
     showToast('success',"Settings Updated successfully!")
    } catch (error:any) {
      showToast('error',error)
  }
  
  }
  
  return (
    <div className="card">
    <div className="card-header">
      <h4 className="card-title">Terms and Conditions</h4>
    </div>
    <div className="card-body p-5">
      <div className="basic-form">
        <form  onSubmit={(e) => handleSubmit(updateSettings)(e)}>
          <div className='row'>
            
              <div className="col-md-12">

                  {/* <label><strong>Terms and Conditions</strong></label> */}
               
        <Editor
        tinymceScriptSrc={'/tinymce/tinymce.min.js'}
        value={termsConditionValue}
        onEditorChange={(newValue) => {
          setValue('termsCondition', newValue); // Update the form value when editor content changes
        }}
        init={tinyMCEInit}
      />   <div>
      {errors?.termsCondition && (
      <span className="text-xs d-flex m-3 text-danger">
        <BsInfoCircleFill size={"0.8rem"} />
        &ensp;
        {errors?.termsCondition?.message}
      </span>
    ) } 
  </div>
              </div>
          <div className="card-footer d-flex justify-content-end mt-10">
              <button type="submit" className="btn btn-primary"  disabled={isSubmitting && isLoading}>
              {isSubmitting ? (<> 
                           {/* <span> Updating</span> */}
                            <PulseLoader loading={isSubmitting} color="#ffffff" size="0.7rem" />
                          </>
                        ) : (
                          'Update Terms and Condition Info'
                        )}  
              </button></div>
          </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default React.memo(TermsCondition);