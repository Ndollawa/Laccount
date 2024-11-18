import React, { useState, useEffect, useCallback } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { PulseLoader } from 'react-spinners';
import Button from "react-bootstrap/Button";
import { useAddNewTeamMutation } from "../slices/teamsApi.slice";
import useWindowSize from '@hooks/useWindowSize';
import ModalComponent from '@dashboard/components/Modal';
import FileUpload from '@components/FileUpload';
import handleApiErrors from "@utils/handleApiErrors";
import showToast from "@utils/showToast";

interface TeamFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  contact: string;
  bio: string;
  status: string;
  image: File | null;
  socialMedia: {
    facebookHandle: string;
    twitterHandle: string;
    instagram: string;
    whatsapp: string;
  };
}

const CreateTeamForm = () => {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting }, reset, setValue, watch } = useForm<TeamFormInputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      position: "",
      contact: "",
      bio: "",
      status: "",
      image:  null,
      socialMedia: {
        facebookHandle: "",
        twitterHandle: "",
        instagram: "",
        whatsapp: "",
      },
    }
  });
  const [addNewTeam, { isSuccess, isError, error }] = useAddNewTeamMutation();
  const image = watch("image");

    const {width} = useWindowSize()
    const [show, setShow] = useState(false);
    const handleOpen = useCallback(() => setShow(true), [show]);
    const handleClose = useCallback(() => setShow(false), [show]);

    
  useEffect(() => {
    if (isSuccess) {
      reset();
      showToast('success', 'Team member created successfully');
    }
    if (isError) {
     handleApiErrors(error, setError);
    }
  }, [isSuccess, isError, reset, error]);

  const onSubmit:SubmitHandler<FieldValues> = async (formFields, e) => {
    e?.preventDefault()
    await addNewTeam(formFields);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file.length > 0) {
      setValue("image", file[0]);
    }
  };

  return (
    <>
      <Button onClick={handleOpen}>Add New</Button>
      <ModalComponent {...{size:((width as number) < 600)? "xl": "lg", header:{show:true,title:'Add New Team Member'},modalStates:{show,handleOpen,handleClose}}} >
        <form onSubmit={(e) => handleSubmit(onSubmit)(e) } encType="multipart/form-data">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                    {...register("firstName", { required: "First name is required" })}
                  />
                  {errors.firstName && <div className="invalid-feedback">{errors.firstName.message}</div>}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                    {...register("lastName", { required: "Last name is required" })}
                  />
                  {errors.lastName && <div className="invalid-feedback">{errors.lastName.message}</div>}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    {...register("email", { required: "Email is required", pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ })}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>contact</label>
                  <input
                    type="text"
                    className={`form-control ${errors.contact ? "is-invalid" : ""}`}
                    {...register("contact", { required: "contact is required" })}
                  />
                  {errors.contact && <div className="invalid-feedback">{errors.contact.message}</div>}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>Position</label>
                  <input
                    type="text"
                    className={`form-control ${errors.position ? "is-invalid" : ""}`}
                    {...register("position", { required: "Position is required" })}
                  />
                  {errors.position && <div className="invalid-feedback">{errors.position.message}</div>}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>Status</label>
                  <select className={`form-control ${errors.status ? "is-invalid" : ""}`} {...register("status", { required: "Status is required" })}>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                  {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Facebook Handle</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("socialMedia.facebookHandle")}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>Twitter Handle</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("socialMedia.twitterHandle")}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>Instagram Handle</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("socialMedia.instagram")}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>Whatsapp</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("socialMedia.whatsapp")}
                  />
                </div>
              </div>

                <div className="col-md-6">
                    <label className="form-label">User Image</label>
                   <FileUpload onChange={handleImageUpload}/>
                    {errors.image && <div className="invalid-feedback">{errors.image.message}</div>}
                  </div>
                  <div className="col-md-6">Preview
                    <div id="preview w-100 position-relative" >
                  {image && <img className="img-responsive w-100 position-relative" src={URL.createObjectURL(image)} alt="Preview" />}
                    </div>
                  </div>

              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <label>Bio</label>
                  <textarea className={`form-control position-relative ${errors.position ? "is-invalid" : ""}`} rows={4} {...register("bio", { required: "Bio is required" })}></textarea>
                 
                </div> 
                {errors.bio && <div className="invalid-feedback">{errors.bio.message}</div>}
            </div>
            <div className="d-flex gap-2 my-3 justify-content-end">
            <Button variant="primary" size="sm" onClick={handleClose}>Close</Button>
          <Button variant="secondary" size="sm" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <PulseLoader loading={isSubmitting} color="#ffffff" size="0.7rem" /> : 'Create New Member'}
          </Button>
          </div>
        </form>
        </ModalComponent>
    </>
  );
};

export default CreateTeamForm;
