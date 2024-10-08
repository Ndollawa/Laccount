import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useAddNewTeamMutation } from "../slices/teamsApi.slice";
import showToast from "../../../../../app/utils/showToast";

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

const CreateTeamForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue, watch } = useForm<TeamFormInputs>();
  const [addNewTeam, { isLoading, isSuccess, isError, error }] = useAddNewTeamMutation();
  const userImage = watch("userImage");

  const onSubmit:SubmitHandler<FieldValues> = async (formFields, e) => {
    e?.preventDefault()
    const formData = new FormData();
    
    formDataToSend.append('firstName', formFields.firstName);
    formDataToSend.append('lastName', formFields.lastName);
    formDataToSend.append('email', formFields.email);
    formDataToSend.append('position', formFields.position);
    formDataToSend.append('phone', formFields.phone);
    formDataToSend.append('bio', formFields.bio);
    formDataToSend.append('status', formFields.status);
    formDataToSend.append('socialMedia', JSON.stringify(formFields.socialMedia));
    
    if (data.userImage && data.userImage.length > 0) {
      formData.append("file", data.userImage[0]);
    }

    await addNewTeam(formData);

    if (isError) {
      showToast("error", JSON.stringify(error?.data?.message));
    } else if (isSuccess) {
      showToast("success", "Team member created successfully");
      reset();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file.length > 0) {
      setValue("userImage", file);
    }
  };

  return (
    <>
      <Button onClick={() => setValue("show", true)}>Add New</Button>

      <Modal show={watch("show")} size="lg" centered backdrop="static" onHide={() => setValue("show", false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Team Member</Modal.Title>
        </Modal.Header>
        <form onSubmit={(e) => handleSubmit(onSubmit)(e) } encType="multipart/form-data">
          <Modal.Body>
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
                  <label>Phone</label>
                  <input
                    type="text"
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                    {...register("phone", { required: "Phone is required" })}
                  />
                  {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
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
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <label>Bio</label>
                  <textarea className="form-control" rows={4} {...register("bio", { required: "Bio is required" })}></textarea>
                  {errors.bio && <div className="invalid-feedback">{errors.bio.message}</div>}
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
                <div className="form-group">
                  <label>User Image</label>
                  <input type="file" className="form-control" onChange={handleImageUpload} />
                  {userImage && userImage[0] && <img src={URL.createObjectURL(userImage[0])} alt="Preview" width="100" />}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setValue("show", false)}>Close</Button>
            <Button type="submit" variant="primary" disabled={isSubmitting || isLoading}>Save</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default CreateTeamForm;
