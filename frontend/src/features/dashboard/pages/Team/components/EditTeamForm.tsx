import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useUpdateTeamMutation } from '../slices/teamsApi.slice';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import showToast from '../../../../../app/utils/showToast';
import TeamProps from '../../../../../app/props/TeamProps';

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface modalDataProps {
  modalData: {
    data: TeamProps | null;
    showModal: boolean;
  };
}

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

const EditTeamModal = ({ modalData: { data, showModal } }: modalDataProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<FileList | null>(null);
  const [show, setShow] = useState(showModal);

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
      setPreviewImage(`${BASE_URL}/uploads/settings/team/${data.userImage}`);
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
    if (isError) return showToast('error', JSON.stringify(error?.data?.message));
    showToast('success', 'Team member updated successfully');
  };

  return (
    <>
      <Modal show={show} size="lg" centered backdrop="static" onHide={() => setShow(false)} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Team Member</Modal.Title>
        </Modal.Header>
        <form onSubmit={(e) => handleSubmit(onSubmit)(e) } encType="multipart/form-data">
          <Modal.Body>
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
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">User Image</label>
                    <div className="input-group mb-3">
                      <input type="file" accept=".jpeg, .jpg, .png, .gif" className="form-control" onChange={handleImageChange} />
                    </div>
                  </div>
                  <div className="col-md-6">Preview
                    <div id="preview">
                      {previewImage && <img className="img-responsive" src={previewImage} alt="User Avatar" width="240" />}
                    </div>
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
                  <div className="col-md-12">
                    <div className="form-group mb-0">
                      <label className="form-label">Bio</label>
                      <textarea className="form-control" {...register('bio')} placeholder="Enter your bio or favorite quote" rows={5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" size="sm" className="rounded-pill" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="secondary" size="sm" className="rounded-pill" type="submit" disabled={isSubmitting}>
              Update Team
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default React.memo(EditTeamModal);
