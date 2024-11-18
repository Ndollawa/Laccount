import React from 'react';
import { BsInfoCircleFill, BsToggle2Off, BsToggle2On } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { useLandingConfig } from '../slices/settings.slice';
import { PulseLoader } from "react-spinners";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useUpdateSettingMutation } from '../slices/settingApi.slice';
import { setLandingSetting } from '../slices/settings.slice';
import showToast from '@utils/showToast';
import { toCamelCase } from '@utils/stringFormat';

const HomePageSettings = () => {
  const dispatch = useDispatch();
  const [updateSetting, { isLoading }] = useUpdateSettingMutation();
  const landingConfig = useSelector(useLandingConfig);
  const { id, settings: { landingPageConfig, colors, ...otherSettings  }} = landingConfig;
  const initialState = { landingPageConfig, colors };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialState,
  });
 
  // Watching the toggle states independently
  // const affiliateToggle = watch("landingPageConfig.showAffiliate", false);
  const blogToggle = watch("landingPageConfig.showBlog", landingPageConfig.showBlog);
  const testimonialToggle = watch("landingPageConfig.showTestimonial", landingPageConfig.showTestimonial);
  const metricsToggle = watch("landingPageConfig.showMetrics", landingPageConfig.showMetrics);
  const whatWeOfferToggle = watch("landingPageConfig.showWhatWeOffer", landingPageConfig.showWhatWeOffer);
  const teamToggle = watch("landingPageConfig.showTeam", landingPageConfig.showTeam);
  const ourBenefitToggle = watch("landingPageConfig.showOurBenefit", landingPageConfig.showOurBenefit);
  const partnersToggle = watch("landingPageConfig.showPartners", landingPageConfig.showPartners);

  const updateSettings: SubmitHandler<FieldValues> = async (formFields, e) => {
    e.preventDefault();
    const { colors, landingPageConfig} = formFields;
    const settings = { landingPageConfig, colors, ...otherSettings };
    try {
      await updateSetting({ id, settings }).unwrap();
      dispatch(setLandingSetting({...landingConfig, settings}));
      showToast('success', "Settings Updated successfully!");
    } catch (error: any) {
      showToast('error', error);
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Home Page</h4>
        </div>
        <div className="card-body p-5">
          <div className="basic-form">
            <form onSubmit={(e) => handleSubmit(updateSettings)(e)}>
              <div className="row">

                {/* Toggle Component */}
                {[
                  // { label: "Show Affiliate Section", field: "landingPageConfig.showAffiliate", toggle: affiliateToggle },
                  { label: "Show Testimonial Section", field: "landingPageConfig.showTestimonial", toggle: testimonialToggle },
                  { label: "Show Blog Section", field: "landingPageConfig.showBlog", toggle: blogToggle },
                  { label: "Show Metric Section", field: "landingPageConfig.showMetrics", toggle: metricsToggle },
                  { label: "Show Partners Section", field: "landingPageConfig.showPartners", toggle: partnersToggle },
                  { label: "Show What we Offer Section", field: "landingPageConfig.showWhatWeOffer", toggle: whatWeOfferToggle },
                  { label: "Show Team Section", field: "landingPageConfig.showTeam", toggle: teamToggle },
                  { label: "Show Our Benefit Section", field: "landingPageConfig.showOurBenefit", toggle: ourBenefitToggle },
                  
                ].map(({ label, field, toggle }, index) => (
                  <div key={index} className="my-1 col-md-12 d-flex justify-content-between">
                    <div>{label}</div>
                    <div>
                      <label htmlFor={field} className="p-10">
                        {toggle ? <BsToggle2On className='text-primary' fontSize={'2rem'} /> : <BsToggle2Off className='text-default' fontSize={'2rem'} />}
                      </label>
                      <input
                        id={field}
                        type="checkbox"
                        checked={toggle}
                        className="setting-checkbox d-none"
                        {...register(field)}
                      />
                      {errors[field] && (
                        <span className="text-xs d-flex m-3 text-danger">
                          <BsInfoCircleFill size={"0.8rem"} />
                          &ensp; {errors[field]?.message}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {/* Colors */}
                <div className="col-12 row my-3">
              <div className="mb-5 col-md-4">
                <label className="form-label">Primary Color</label>
                <input
                  type="color"
                  className="form-control"
                  
                  {...register('colors.primary', {
                    required: "Field: Primary color is required!",
                    value:colors.primary
                  })}
                />
                {errors.colors?.primary && (
                  <span className="text-xs d-flex m-3 text-danger">
                    <BsInfoCircleFill size="0.8rem" />
                    &ensp;{errors.colors?.primary?.message}
                  </span>
                )}
              </div>

              <div className="mb-5 col-md-4">
                <label className="form-label">Secondary Color</label>
                <input
                  type="color"
                  className="form-control"
                  {...register('colors.secondary', {
                    required: "Field: Secondary color is required!",
                  value:colors.secondary
                  })}
                />
                {errors.colors?.secondary && (
                  <span className="text-xs d-flex m-3 text-danger">
                    <BsInfoCircleFill size="0.8rem" />
                    &ensp;{errors.colors?.secondary?.message}
                  </span>
                )}
              </div>

              <div className="mb-5 col-md-4">
                <label className="form-label">Tertiary Color</label>
                <input
                  type="color"
                  className="form-control"
                  {...register('colors.tertiary', {
                    required: "Field: Tertiary color is required!",
                  value:colors.tertiary
                  })}
                />
                {errors.colors?.tertiary && (
                  <span className="text-xs d-flex m-3 text-danger">
                    <BsInfoCircleFill size="0.8rem" />
                    &ensp;{errors.colors?.tertiary?.message}
                  </span>
                )}
              </div>
              </div>
{/* Additional Style Fields */}
{['Slider Style', 'About Us Style', 'Service Style', 'What We Offer Style', 'Testimonial Style', 'Our Benefit Style', 'Our Blog Style'].map((style, index) => (
                <div key={index} className="mb-5 col-md-4 col-sm-2">
                  <label className="form-label">{style}</label>
                  <select
                    className="default-select form-control wide"
                    {...register(`landingPageConfig.${toCamelCase(style)}`, {
                      required: `Field: ${style} is required!`
                    })}
                  >
                    <option value="">Choose...</option>
                    {[1, 2, 3].map(option => (
                      <option key={option} selected={landingPageConfig?.[`${toCamelCase(style)}`] === option} value={option}>Style {option}</option>
                    ))}
                  </select>
                  {errors.landingPageConfig?.[`${toCamelCase(style)}`] && (
                    <span className="text-xs d-flex m-3 text-danger">
                      <BsInfoCircleFill size="0.8rem" />
                      &ensp;{errors.landingPageConfig?.[`${toCamelCase(style)}`]?.message}
                    </span>
                  )}
                </div>
              ))}
                <div className="card-footer d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting && isLoading}>
                    {isSubmitting ? (
                      <>
                        <PulseLoader loading={isSubmitting} color="#ffffff" size="0.7rem" />
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(HomePageSettings);
