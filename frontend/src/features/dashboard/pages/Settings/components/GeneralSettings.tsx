import React from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useDispatch ,useSelector} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import { BsInfoCircleFill } from "react-icons/bs";
import { PulseLoader } from "react-spinners";
import { useUpdateSettingMutation } from "../slices/settingApi.slice";
import { setCompanyInfoSetting, useSettings } from "../slices/settings.slice";
import { useCompanyInfo } from "../slices/settings.slice";
import showToast from "@utils/showToast";

interface FormInput {
  siteName:string;
  city:string;
  state:string;
  country:string;
  zip:string;
  description:string;
  email:string,
  contact:string,
  address:string;
  activeHours:string;
  socialMedia:{
  facebookHandle:string;
  twitterHandle:string;
  instagram:string;
  whatsapp:string;
}
}
const GeneralSettings = () => {
const dispatch = useDispatch();
const {companyInfo} = useSelector(useSettings)
const {id, settings:{companyDetails, ...otherSettings}={}} = useSelector(useCompanyInfo);
const [updateSetting,isLoading] = useUpdateSettingMutation();
const initialState = {
  ...companyDetails,
  contact: companyDetails?.contact?.join(","),
  email: companyDetails?.email?.join(","),
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

const updateSettings:SubmitHandler<FieldValues> = async(formFields, e)=>{
e.preventDefault();
  const emailArray = (formFields.email as string)
      ?.split(',')
      ?.map((email:string) => email.trim()) // Remove whitespace from each email
      ?.filter((email:string) => email.length > 0);
      const contactArray = (formFields.contact as string)
      ?.split(',')
      ?.map((contact:string) => contact.trim()) // Remove whitespace from each email
      ?.filter((contact:string) => contact.length > 0);
const settings = {companyDetails:{...companyDetails, ...{...formFields, email:emailArray, contact:contactArray}}, ...otherSettings}
try{
  const res = await updateSetting({id,settings}).unwrap()
dispatch(setCompanyInfoSetting({ ...companyInfo, settings }))
showToast('success',"Settings Updated successfully!")
} catch (error:any) {
  showToast('error',error?.message)
}

}

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Comany Information</h4>
        </div>
        <div className="card-body">
          <div className="basic-form">
            <form onSubmit={(e) => handleSubmit(updateSettings)(e)}>
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label className="form-label"><strong>Company Name</strong></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    {...register('siteName',{
                      required:"Field: Company or Site name required!"
                    })} 
                  />
                  <div>
              {errors?.siteName && (
              <span className="text-xs d-flex m-3 text-danger">
                <BsInfoCircleFill size={"0.8rem"} />
                &ensp;
                {errors?.siteName?.message}
              </span>
            ) } 
          </div>
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label"><strong>Company Email</strong></label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder=""
                      {...register('email', {
                      required: 'Field: Company email required!',
                      validate: (value) => {
                        const emails = (Array.isArray(value) ? value.join(',') : value)?.split(',')?.map(email => email.trim());
                        const validEmails = emails.every(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
                        return validEmails || 'Please enter valid email addresses';
                      }
                    })}
                  />
                  <div>
              {errors?.email && (
              <span className="text-xs d-flex m-3 text-danger">
                <BsInfoCircleFill size={"0.8rem"} />
                &ensp;
                {errors?.email?.message}
              </span>
            ) } 
          </div>
                </div>
             
                
                <div className="mb-3 col-md-6">
                  <label className="form-label"><strong>Address</strong></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    {...register('address',{
                      required:"Field Company address required!"
                    })} 
                  />
                  <div>
              {errors?.address && (
              <span className="text-xs d-flex m-3 text-danger">
                <BsInfoCircleFill size={"0.8rem"} />
                &ensp;
                {errors?.address?.message}
              </span>
            ) } 
          </div>
                </div>
               
                <div className="mb-3 col-md-6">
                  <label className="form-label"><strong>Contact Number</strong></label>
                  <input
                    type="tel"
                    className="form-control"
                   
                    placeholder=""
                
                    {...register('contact', {
                      required: 'Field: Company contact required!',
                        validate: (value) => {
                          const contacts = (Array.isArray(value) ? value.join(',') : value).split(',').map(contact => contact.trim());
                          const validContacts = contacts.every(contact => /^\+?[1-9]\d{1,14}$/.test(contact)); // Basic phone number validation
                          return validContacts || 'Please enter valid contact numbers with Country code @example +234***';
                        }
                      })}
                  />
                  <div>
              {errors?.contact && (
              <span className="text-xs d-flex m-3 text-danger">
                <BsInfoCircleFill size={"0.8rem"} />
                &ensp;
                {errors?.contact?.message}
              </span>
            ) } 
          </div>
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label"><strong>City</strong></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="city"
                    {...register('city',{
                      required:"Field Company or Site name required!"
                    })} 
                  />
                  <div>
              {errors?.city && (
              <span className="text-xs d-flex m-3 text-danger">
                <BsInfoCircleFill size={"0.8rem"} />
                &ensp;
                {errors?.city?.message}
              </span>
            ) } 
          </div>
                </div>
             
                <div className="mb-3 col-md-4">
                  <label className="form-label"><strong>State</strong></label>
                  <input
                    id="inputState"
                    type='text'
                    className="form-control"
                    {...register('state',{
                      required:"Field Company or Site name required!"
                    })} 
                  />
                  <div>
              {errors?.state && (
              <span className="text-xs d-flex m-3 text-danger">
                <BsInfoCircleFill size={"0.8rem"} />
                &ensp;
                {errors?.state?.message}
              </span>
            ) } 
          </div>
                </div>
                <div className="mb-3 col-md-2">
                  <label className="form-label"><strong>Zip</strong></label>
                  <input 
                  type="number" 
                  className="form-control"
                  {...register('zip',{
                    required:"Field Company or Site name required!"
                  })} 
                />
                <div>
            {errors?.zip && (
            <span className="text-xs d-flex m-3 text-danger">
              <BsInfoCircleFill size={"0.8rem"} />
              &ensp;
              {errors?.zip?.message}
            </span>
          ) } 
        </div>
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label"><strong>Country</strong></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    {...register('country',{
                      required:"Field Company or Site name required!"
                    })} 
                  />
                  <div>
              {errors?.country && (
              <span className="text-xs d-flex m-3 text-danger">
                <BsInfoCircleFill size={"0.8rem"} />
                &ensp;
                {errors?.country?.message}
              </span>
            ) } 
          </div>
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label"><strong>Active Hours</strong></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    {...register('activeHours',{
                      required:"Field Company or Site name required!"
                    })} 
                  />
                  <div>
              {errors?.activeHours && (
              <span className="text-xs d-flex m-3 text-danger">
                <BsInfoCircleFill size={"0.8rem"} />
                &ensp;
                {errors?.activeHours?.message}
              </span>
            ) } 
          </div>
                </div>
                 <div className="mb-3 col-md-6">
                  <label className="form-label"><strong>Facebook Handle</strong></label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://facebook.com/@companyName"
                    {...register('socialMedia.facebookHandle',{
                      // required:"Field Company or Site name required!"
                    })} 
                  />
                  <div>
              {errors?.socialMedia?.facebookHandle && (
              <span className="text-xs d-flex m-3 text-danger">
                <BsInfoCircleFill size={"0.8rem"} />
                &ensp;
                {errors?.socialMedia?.facebookHandle?.message}
              </span>
            ) } 
          </div>
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label"><strong>Twitter Handle</strong></label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://twitter.com/@companyName"
                    {...register('socialMedia.twitterHandle',{
                      // required:"Field Company or Site name required!"
                    })} 
                  />
                  <div>
              {errors?.socialMedia?.twitterHandle && (
              <span className="text-xs d-flex m-3 text-danger">
                <BsInfoCircleFill size={"0.8rem"} />
                &ensp;
                {errors?.socialMedia?.twitterHandle?.message}
              </span>
            ) } 
          </div>
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label"><strong>Instagram Handle</strong></label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://instagram.com/@companyName"
                    {...register('socialMedia.instagram',{
                      // required:"Field Company or Site name required!"
                    })} 
                  />
                  <div>
              {errors?.socialMedia?.instagram && (
              <span className="text-xs d-flex m-3 text-danger">
                <BsInfoCircleFill size={"0.8rem"} />
                &ensp;
                {errors?.socialMedia?.instagram?.message}
              </span>
            ) } 
          </div>
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label"><strong>Whatsapp</strong></label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://twhatsapp.com/@companyName"
                    {...register('socialMedia.whatsapp',{
                      // required:"Field Company or Site name required!"
                    })} 
                  />
                  <div>
              {errors?.socialMedia?.whatsapp && (
              <span className="text-xs d-flex m-3 text-danger">
                <BsInfoCircleFill size={"0.8rem"} />
                &ensp;
                {errors?.socialMedia?.whatsapp?.message}
              </span>
            ) } 
          </div>
                </div>
                <div className="mb-3 col-md-12">
                  <label className="form-label"><strong>Company's Description</strong></label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder=""
                    rows={10}
                    {...register('description',{
                      required:"Field Company or Site name required!"
                    })} 
                 
                ></textarea>
            <div>
              {errors?.description && (
              <span className="text-xs d-flex m-3 text-danger">
                <BsInfoCircleFill size={"0.8rem"} />
                &ensp;
                {errors?.description?.message}
              </span>
            ) } 
          </div>
                </div>
              </div>
              <div className="card-footer d-flex justify-content-end mt-10">
              <button type="submit" className="btn btn-primary"  disabled={isSubmitting && isLoading}>
              {isSubmitting ? (
                          <>
                           {/* <span> Updating</span> */}
                            <PulseLoader loading={isSubmitting} color="#ffffff" size="0.7rem" />
                          </>
                        ) : (
                          'Update Site Info'
                        )}  
              </button></div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(GeneralSettings);
