import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { FaPencilAlt, FaRegTimesCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import MainBody from '../../components/MainBody';
import { selectCurrentUser } from '@auth/slices/auth.slice';
import useUserImage from '@hooks/useUserImage';
import showToast from '@utils/showToast';
import { useUpdateUserMutation, useCheckDuplicateUserMutation, useUserUploadMutation, useUserRemoveFileMutation } from '@dashboard/pages/Users/slices/usersApi.slice';

const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const ProfileEdit = () => {
  const currentUser = useSelector(selectCurrentUser);
  const userImage = useUserImage(currentUser);

  const { register, handleSubmit, watch, formState: { errors }, setError, clearErrors } = useForm({
    defaultValues: {
      email: currentUser.email,
      username: currentUser.username,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      phone: currentUser.phone,
      dob: currentUser.dob,
      gender: currentUser.gender,
      address: currentUser.address,
      city: currentUser.city,
      state: currentUser.state,
      country: currentUser.country,
      occupation: currentUser.occupation,
      bio: currentUser.bio,
      password: '',
      confirmPassword: ''
    }
  });

  const [updateUser] = useUpdateUserMutation();
  const [checkDuplicateUser] = useCheckDuplicateUserMutation();
  const [userUpload] = useUserUploadMutation();
  const [userRemoveFile] = useUserRemoveFileMutation();

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const updateProfile = async (data) => {
    if (!USER_REGEX.test(data.username)) {
      setError('username', { type: 'manual', message: 'Invalid Username' });
      return;
    }
    if (!EMAIL_REGEX.test(data.email)) {
      setError('email', { type: 'manual', message: 'Invalid Email' });
      return;
    }

    await updateUser({
      _id: currentUser._id,
      data,
      type: 'profileUpdate'
    });

    if (errors) return showToast('error', 'Profile update failed');
    showToast('success', 'Profile updated successfully!');
  };

  const updateProfilePassword = async () => {
    if (password !== confirmPassword) {
      setError('confirmPassword', { type: 'manual', message: 'Passwords do not match' });
      return;
    }

    await updateUser({
      _id: currentUser._id,
      type: 'passwordUpdate',
      data: { password }
    });

    if (errors) return showToast('error', 'Password update failed');
    showToast('success', 'Password updated successfully!');
  };

  const handleFileUpload = async (e) => {
    const files = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", files);
    formData.append('_id', currentUser._id);

    await userUpload(formData);

    if (errors) return showToast('error', 'File upload failed');
    showToast('success', 'Profile picture uploaded successfully!');
  };

  const removeImage = async () => {
    await userRemoveFile({ _id: currentUser._id, file: currentUser.userImage, type: 'avatar' });

    if (errors) return showToast('error', 'Image removal failed');
    showToast('success', 'Image removed successfully!');
  };

  const genderOptions = ['male', 'female'].map((userGender, i) => (
    <option key={i} value={userGender}>{userGender.toUpperCase()}</option>
  ));

  return (
    <MainBody>
      <div className="container-fluid">
        <div className="panel card-topline-primary">
          <div className="side-app">
            <div className="row">
              <div className="col-lg-4">
                <div className="card" style={{ height: '60%' }}>
                  <div className="card-header">
                    <h3 className="card-title">Change Password</h3>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit(updateProfilePassword)}>
                      <div className="form-group">
                        <label className="form-label">New Password</label>
                        <input
                          type="password"
                          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                          {...register('password', {
                            required: true,
                            pattern: PWD_REGEX
                          })}
                        />
                        {errors.password && <div className="invalid-feedback">Invalid password</div>}
                      </div>
                      <div className="form-group">
                        <label className="form-label">Confirm Password</label>
                        <input
                          type="password"
                          className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                          {...register('confirmPassword', {
                            required: true,
                            validate: value => value === password || 'Passwords do not match'
                          })}
                        />
                        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
                      </div>
                      <button type="submit" className="btn btn-primary btn-block">Save Changes</button>
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-lg-8">
                <form className="card" onSubmit={handleSubmit(updateProfile)}>
                  <div className="card-header">
                    <h3 className="card-title">Edit Profile</h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="form-label">First Name</label>
                          <input type="text" className="form-control" {...register('firstName')} />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="form-label">Last Name</label>
                          <input type="text" className="form-control" {...register('lastName')} />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="form-label">Username</label>
                          <input type="text" className={`form-control ${errors.username ? 'is-invalid' : ''}`} {...register('username')} />
                          {errors.username && <div className="invalid-feedback">Invalid username</div>}
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="form-label">Email</label>
                          <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} {...register('email')} />
                          {errors.email && <div className="invalid-feedback">Invalid email</div>}
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="form-label">Date of Birth</label>
                          <input type="date" className="form-control" {...register('dob')} />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="form-label">Phone</label>
                          <input type="tel" className="form-control" {...register('phone')} />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="form-label">Gender</label>
                          <select className="form-control" {...register('gender')}>
                            {genderOptions}
                          </select>
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="form-label">Occupation</label>
                          <input type="text" className="form-control" {...register('occupation')} />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="form-label">City</label>
                          <input type="text" className="form-control" {...register('city')} />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="form-label">Country</label>
                          <input type="text" className="form-control" {...register('country')} />
                        </div>
                      </div>

                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Bio</label>
                          <textarea className="form-control" {...register('bio')} />
                        </div>
                      </div>

                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Address</label>
                          <textarea className="form-control" {...register('address')} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer text-right">
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainBody>
  );
};

export default ProfileEdit;
