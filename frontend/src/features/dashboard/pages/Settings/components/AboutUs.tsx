import React, { useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { BsInfoCircleFill } from 'react-icons/bs';
import { PulseLoader } from 'react-spinners';
import { useUpdateSettingMutation } from '../slices/settingApi.slice';
import { setLandingSetting, useLandingConfig } from '../slices/settings.slice';
import showToast from '@utils/showToast';
import tinyMCEInit from '@configs/tinymce.config';

const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL;

const AboutUs = () => {
  const landingConfig = useSelector(useLandingConfig);
  const { id, settings: { pages, ...otherSettings }} = landingConfig;
  const initialState = {
    aboutUs: pages?.aboutUs || "",
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialState,
  });

  const dispatch = useDispatch();
  const [updateSetting, { isLoading }] = useUpdateSettingMutation();

  // Watch form fields
  const aboutUsValue = watch('aboutUs');

  const updateSettings: SubmitHandler<FieldValues> = async (formFields, e) => {
    e?.preventDefault();
    try {
      const settings = { ...otherSettings, pages: { ...pages, ...formFields }, };
      await updateSetting({ id, settings }).unwrap();
      dispatch(setLandingSetting({ ...landingConfig, settings }));
      showToast('success', "Settings Updated successfully!");
    } catch (error: any) {
      showToast('error', error.message || 'Error updating settings');
    }
  };

  useEffect(() => {
    // Initialize the value in TinyMCE editor
    setValue('aboutUs', initialState.aboutUs);
  }, [setValue, initialState.aboutUs]);

  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">About Us</h4>
      </div>
      <div className="card-body p-5">
        <div className="basic-form">
          <form onSubmit={handleSubmit(updateSettings)}>
            <div className='row'>
              <div className="col-md-12">
                <Editor
                  tinymceScriptSrc={`/tinymce/tinymce.min.js`}
                  value={aboutUsValue}
                  onEditorChange={(newValue) => {
                    setValue('aboutUs', newValue); // Update the form value when editor content changes
                  }}
                  init={tinyMCEInit}
                />
                <div>
                  {errors?.aboutUs && (
                    <span className="text-xs d-flex m-3 text-danger">
                      <BsInfoCircleFill size={"0.8rem"} />
                      &ensp;
                      {errors?.aboutUs?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="card-footer d-flex justify-content-end mt-10">
              <button type="submit" className="btn btn-primary" disabled={isSubmitting && isLoading}>  {isSubmitting ? (
                          <>
                           {/* <span> Updating</span> */}
                            <PulseLoader loading={isSubmitting} color="#ffffff" size="0.7rem" />
                          </>
                        ) : (
                          'Update About Us Info'
                        )}  
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default React.memo(AboutUs);
