import React, { useEffect, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import MainBody from '../../components/MainBody';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../auth/slices/auth.slice';
import useUserImage from '@hooks/useUserImage';
import { FaPencilAlt, FaRegTimesCircle } from 'react-icons/fa';
import showToast from '@utils/showToast';
import { useUpdateUserMutation, useCheckDuplicateUserMutation, useUserUploadMutation, useUserRemoveFileMutation } from '../Users/slices/usersApi.slice';
import * as yup from 'yup';  // For schema validation if needed

const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ProfileEdit = () => {
    const currentUser = useSelector(selectCurrentUser);
    const userImage = useUserImage(currentUser);
    
    const { register, handleSubmit, formState: { errors }, watch, setValue, setError } = useForm({
        defaultValues: {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            username: currentUser.username,
            password: '',
            confirmPassword: '',
            phone: currentUser.phone,
            dob: currentUser.dob,
            gender: currentUser.gender,
            address: currentUser.address,
            city: currentUser.city,
            state: currentUser.state,
            country: currentUser.country,
            occupation: currentUser.occupation,
            bio: currentUser.bio
        }
    });

    const [updateUser] = useUpdateUserMutation();
    const [checkDuplicateUser] = useCheckDuplicateUserMutation();
    const [userUpload] = useUserUploadMutation();
    const [userRemoveFile] = useUserRemoveFileMutation();

    const password = watch('password');
    const confirmPassword = watch('confirmPassword');

    useEffect(() => {
        if (password !== confirmPassword) {
            setError('confirmPassword', { message: 'Passwords do not match' });
        }
    }, [password, confirmPassword, setError]);

    const onSubmit = async (data: any) => {
        if (USER_REGEX.test(data.username) && EMAIL_REGEX.test(data.email)) {
            await updateUser({ _id: currentUser.id, data, type: 'profileUpdate' });
            showToast('success', 'Profile updated successfully!');
        } else {
            showToast('error', 'Validation error');
        }
    };

    const updateProfilePicture = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files!;
        const formData = new FormData();
        formData.append("avatar", files[0]!);
        formData.append('_id', currentUser.id);
        await userUpload(formData);
        showToast('success', 'Profile Picture Uploaded successfully');
    };

    const removeImage = async () => {
        await userRemoveFile({ _id: currentUser.id, file: currentUser.userImage, type: 'avatar' });
        showToast('success', 'Image removed successfully');
    };

    return (
        <MainBody>
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)} className="row">
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Change Password</h3>
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label>New Password</label>
                                    <input type="password" className="form-control" {...register('password', { 
                                        pattern: PWD_REGEX, 
                                        required: 'Password is required' 
                                    })} />
                                    {errors.password && <span className="text-danger">{errors.password.message}</span>}
                                </div>

                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input type="password" className="form-control" {...register('confirmPassword', { required: 'Please confirm your password' })} />
                                    {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Edit Profile</h3>
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" className="form-control" {...register('firstName', { required: 'First name is required' })} />
                                    {errors.firstName && <span className="text-danger">{errors.firstName.message}</span>}
                                </div>

                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" className="form-control" {...register('lastName', { required: 'Last name is required' })} />
                                    {errors.lastName && <span className="text-danger">{errors.lastName.message}</span>}
                                </div>

                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" {...register('email', { pattern: EMAIL_REGEX, required: 'Email is required' })} />
                                    {errors.email && <span className="text-danger">{errors.email.message}</span>}
                                </div>

                                {/* Other fields similarly refactored... */}
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary">Update Profile</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </MainBody>
    );
};

export default React.memo(ProfileEdit);
