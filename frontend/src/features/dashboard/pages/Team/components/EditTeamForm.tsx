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
  phone: string;
  bio: string;
  status: string;
  userImage: FileList;
  socialMedia: {
    facebookHandle: string;
    twitterHandle: string;
    instagram: string;
    whatsapp: string;
  };
}

const EditTeamModal = ({ modalData: { data, showModal } }: ModalDataProps<TeamProps>) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<FileList | null>(null);
  const {width} = useWindowSize()

  const [show, setShow] = useState(showModal);
  const handleOpen = useCallback(() => setShow(true), [show]);
  const handleClose = useCallback(() => setShow(false), [show]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<TeamFormInputs>();

  const [updateTeam, { isLoading, isError, error }] = useUpdateTeamMutation();

  useEffect(() => {
    if (data) {
      setValue('firstName', data.firstName);
      setValue('lastName', data.lastName);
      setValue('email', data.email);
      setValue('position', data.position);
      setValue('phone', data.phone);
      setValue('bio', data.bio);
      setValue('status', data.status);
      setValue('socialMedia.facebookHandle', data.socialMedia?.facebookHandle);
      setValue('socialMedia.twitterHandle', data.socialMedia?.twitterHandle);
      setValue('socialMedia.instagram', data.socialMedia?.instagram);
      setValue('socialMedia.whatsapp', data.socialMedia?.whatsapp);
      setPreviewImage(`${TEAM_ASSETS}${data.userImage}`);
    }
    setShow(showModal);

    return () => setShow(false);
  }, [data, showModal, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file.length > 0) {
      setUserImage(file);
      const fileUrl = (window.URL || window.webkitURL).createObjectURL(file[0]);
      setPreviewImage(fileUrl);
    }
  };

  const onSubmit:SubmitHandler<FieldValues> = async (formFields, e) => {
    e?.preventDefault()
    const formDataToSend = new FormData();
    formDataToSend.append('id', data?.id!);
    formDataToSend.append('firstName', formFields.firstName);
    formDataToSend.append('lastName', formFields.lastName);
    formDataToSend.append('email', formFields.email);
    formDataToSend.append('position', formFields.position);
    formDataToSend.append('phone', formFields.phone);
    formDataToSend.append('bio', formFields.bio);
    formDataToSend.append('status', formFields.status);
    formDataToSend.append('socialMedia', JSON.stringify(formFields.socialMedia));

    if (userImage) {
      formDataToSend.append('file', userImage[0]);
    }

    await updateTeam(formDataToSend);
    if (isError) return showToast('error', error?.data?.message);
    showToast('success', 'Team member updated successfully');
  };

  return (
    <>
           
      <ModalComponent {...{size:((width as number) < 600)? "xl": "lg", header:{show:true,title:'Edit Team Member'},modalStates:{show,handleOpen,handleClose}}} >
        <form onSubmit={(e) => handleSubmit(onSubmit)(e) } encType="multipart/form-data">
            <div className="card-body">
              <div className="basic-form">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">First Name</label>
                      <input className="form-control" {...register('firstName')} placeholder="First Name" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Last Name</label>
                      <input className="form-control" {...register('lastName')} placeholder="Last Name" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input className="form-control" type="email" {...register('email')} placeholder="Email" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Position</label>
                      <input className="form-control" {...register('position')} placeholder="Position" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input className="form-control" {...register('phone')} placeholder="Phone" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Status</label>
                    <select className="form-control" {...register('status')}>
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Inactive</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Facebook Handle</label>
                      <input className="form-control" {...register('socialMedia.facebookHandle')} placeholder="https://facebook.com/@userName" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Twitter Handle</label>
                      <input className="form-control" {...register('socialMedia.twitterHandle')} placeholder="https://twitter.com/@userName" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Instagram Handle</label>
                      <input className="form-control" {...register('socialMedia.instagram')} placeholder="https://instagram.com/@userName" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Whatsapp</label>
                      <input className="form-control" {...register('socialMedia.whatsapp')} placeholder="https://whatsapp.com/@userName" />
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
                    <div className="form-group mb-0">
                      <label className="form-label">Bio</label>
                      <textarea className="form-control" {...register('bio')} placeholder="Enter your bio or favorite quote" rows={5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
        </form>
        </ModalComponent>
    </>
  );
};

export default React.memo(EditTeamModal);
