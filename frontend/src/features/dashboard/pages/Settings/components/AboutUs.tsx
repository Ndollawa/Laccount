import React, { useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateSettingMutation } from '../slices/settingApi.slice';
import { setLandingSetting, useLandingConfig } from '../slices/settings.slice';
import showToast from '../../../../../app/utils/showToast';
import { BsInfoCircleFill } from 'react-icons/bs';
import { PulseLoader } from 'react-spinners';

const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL;

const AboutUs = () => {
  const { id, settings: { pages, ...otherSettings } = {} } = useSelector(useLandingConfig);
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
      const settings = { pages: { ...pages, ...formFields }, ...otherSettings };
      await updateSetting({ id, settings }).unwrap();
      dispatch(setLandingSetting(settings));
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
      <div className="card-header bg-secondary">
        <h4 className="card-title text-white">About Us</h4>
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
                  init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                      'bold italic forecolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
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
