import React, { useState, useEffect, useCallback } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { PulseLoader } from 'react-spinners';
import Button from 'react-bootstrap/Button';
import showToast from '@utils/showToast';
import TeamProps from '@props/TeamProps';
import { useUpdateTeamMutation } from '../slices/teamsApi.slice';
import useWindowSize from '@hooks/useWindowSize';
import ModalComponent from '@dashboard/components/Modal';
import FileUpload from '@components/FileUpload';
import { ModalDataProps } from '@props';

const TEAM_ASSETS = import.meta.env.VITE_TEAM_ASSETS;

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

const EditTeamModal = ({ modalData: { data, showModal } }: ModalDataProps<TeamProps>) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const {width} = useWindowSize()

  const [show, setShow] = useState(showModal);
  const handleOpen = useCallback(() => setShow(true), [show]);
  const handleClose = useCallback(() => setShow(false), [show]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {errors, isSubmitting },
  } = useForm<TeamFormInputs>({
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

  const [updateTeam, {  isSuccess, isError, error  }] = useUpdateTeamMutation();

  useEffect(() => {
    if (data) {
      setValue('firstName', data.firstName);
      setValue('lastName', data.lastName);
      setValue('email', data.email);
      setValue('position', data.position);
      setValue('contact', data.contact);
      setValue('bio', data.bio);
      setValue('status', data.status);
      setValue('socialMedia', data.socialMedia);
      setPreviewImage(`${TEAM_ASSETS}${data.image}`);
    }
    setShow(showModal);

    return () => setShow(false);
  }, [data, showModal, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file.length > 0) {
      setValue('image', file[0]);
      const fileUrl = (window.URL || window.webkitURL).createObjectURL(file[0]);
      setPreviewImage(fileUrl);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      handleClose()
      showToast('success', 'Team Member updated successfully');
      setPreviewImage('');
    }
    if (isError) {
      showToast('error', error?.message);
    }
  }, [isSuccess, isError, reset, error]);

  const onSubmit:SubmitHandler<FieldValues> = async (formFields, e) => {
    e?.preventDefault()
    await updateTeam({id: data.id, ...formFields});
  };

  return (
    <>
           
      <ModalComponent {...{size:((width as number) < 600)? "xl": "lg", header:{show:true,title:'Edit Team Member'},modalStates:{show,handleOpen,handleClose}}} >
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
                  <select className="form-control" {...register("status", { required: "Status is required" })}>
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
                   <FileUpload onChange={handleImageChange}/>
                  </div>
                  <div className="col-md-6">Preview
                    <div id="preview w-100 position-relative">
                      {previewImage && <img className="img-responsive w-100 position-relative" src={previewImage} alt="User Avatar" />}
                    </div>
                  </div>
               
                          
                    <div className="col-md-12">
                          <div className="form-group">
                            <label>Bio</label>
                            <textarea className="form-control" rows={4} {...register("bio", { required: "Bio is required" })}></textarea>
                            {errors.bio && <div className="invalid-feedback">{errors.bio.message}</div>}
                          </div>
                      </div>
                      </div>
                      <div className="d-flex gap-2 my-3 justify-content-end">
                      <Button variant="primary" size="sm" onClick={handleClose}>Close</Button>
                    <Button variant="secondary" size="sm" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? <PulseLoader loading={isSubmitting} color="#ffffff" size="0.7rem" /> : 'Update Member'}
                    </Button>
                    </div>
        </form>
        </ModalComponent>
    </>
  );
};

export default React.memo(EditTeamModal);
