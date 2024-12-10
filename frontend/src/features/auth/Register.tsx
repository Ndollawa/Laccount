import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { GoKey } from 'react-icons/go';
import { GrMail } from 'react-icons/gr';
import { PulseLoader } from 'react-spinners';
import { FaUser, FaRegUserCircle, FaKeycdn, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useCompanyInfo, useLandingConfig } from '@dashboard/pages/Settings/slices/settings.slice';
import { useRegisterMutation } from './slices/authApi.slice';
import { useCheckDuplicateUserMutation } from '@dashboard/pages/Users/slices/usersApi.slice';
import OtherBody from '@dashboard/components/OtherBody';
import showToast from '@utils/showToast';
import { setCredentials } from './slices/auth.slice';
import { AuthProps } from '@props/authProps';

const BRAND_ASSETS = import.meta.env.VITE_BRAND_ASSETS;

const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const { settings: {companyDetails:{ siteName } = {}}={} } = useSelector(useCompanyInfo);
  const { settings: { siteImages: { logo } = {} } = {} } = useSelector(useLandingConfig);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const from = location?.state?.from?.pathname || '/dashboard';
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<FormValues>({ mode: 'onBlur' });

  const [checkDuplicateUser] = useCheckDuplicateUserMutation();
  const [registerUser, { isLoading, error, data, isSuccess }] = useRegisterMutation();

  const pwd = watch('password');
  const cpwd = watch('confirmPassword');

  const onSubmit = async (data: FormValues) => {
    const { accessToken } = await registerUser(data).unwrap();
    const decodedToken: AuthProps['token'] | undefined = accessToken ? jwtDecode(accessToken) : undefined;
    const user_info = decodedToken?.sub;

    dispatch(setCredentials({ accessToken, user_info }));
    reset();
    navigate(from);
    if (error) {
      showToast('error', 'Registration failed');
    } else if (isSuccess) {
      showToast('success', 'New Account successfully created!');
    }
  };

  const handleShowPassword = (type: string) => {
    if (type === 'pwd') setShowPassword(!showPassword);
    else setShowCPassword(!showCPassword);
  };

  return (
    <OtherBody>
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-lg-6 col-md-9 col-sm-12 ">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
                      <Link to="/" className="brand-logo d-flex justify-content-center align-items-center">
                        <img src={`${BRAND_ASSETS}${logo}`} alt={siteName} width="150" />
                      </Link>
                    </div>
                    <h4 className="text-center mb-4">Sign up your account</h4>

                    <form onSubmit={handleSubmit(onSubmit)} className='p-4'>
                      {/* Username */}
                      <div className="mb-3">
                        <label className="form-label">
                          <strong>Username</strong>
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaRegUserCircle fontSize="1rem" />
                          </span>
                          <input
                            type="text"
                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                            placeholder="Username"
                            {...register('username', {
                              required: 'Username is required',
                              pattern: {
                                value: USER_REGEX,
                                message: 'Invalid username format',
                              },
                              validate: async (value) => {
                                const { data } = await checkDuplicateUser({ user: value });
                                return data.message  || 'Username already taken';
                              },
                            })}
                          />
                          {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
                        </div>
                      </div>

                      {/* Email */}
                      <div className="mb-3">
                        <label className="form-label">
                          <strong>Email</strong>
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <GrMail fontSize="1rem" />
                          </span>
                          <input
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            placeholder="hello@example.com"
                            {...register('email', {
                              required: 'Email is required',
                              pattern: {
                                value: EMAIL_REGEX,
                                message: 'Invalid email format',
                              },
                              validate: async (value) => {
                                const { data } = await checkDuplicateUser({ user: value });
                                return data.message  || 'Email already in use';
                              },
                            })}
                          />
                          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                        </div>
                      </div>

                      {/* Password */}
                      <div className="mb-3">
                        <label className="form-label">
                          <strong>Password</strong>
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <GoKey fontSize="1rem" />
                          </span>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="Password"
                            {...register('password', {
                              required: 'Password is required',
                              pattern: {
                                value: PWD_REGEX,
                                message: 'Password must be 8-24 characters and include uppercase, lowercase, number, and special character',
                              },
                            })}
                          />
                          <span className="input-group-text" onClick={() => handleShowPassword('pwd')}>
                            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                          </span>
                          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                        </div>
                      </div>

                      {/* Confirm Password */}
                      <div className="mb-3">
                        <label className="form-label">
                          <strong>Confirm Password</strong>
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaKeycdn fontSize="1rem" />
                          </span>
                          <input
                            type={showCPassword ? 'text' : 'password'}
                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                            placeholder="Confirm Password"
                            {...register('confirmPassword', {
                              required: 'Confirm your password',
                              validate: (value) => value === pwd || 'Passwords do not match',
                            })}
                          />
                          <span className="input-group-text" onClick={() => handleShowPassword('cpwd')}>
                            {showCPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                          </span>
                          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
                        </div>
                      </div>

                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block d-flex justify-content-center align-items-center"
                          disabled={isLoading}
                        >
                          {isLoading ? "Registering" : "Register Me"}{" "}
                          {isLoading && <PulseLoader loading={isLoading} color="#ffffff" size="0.85rem" />}
                        </button>
                      </div>
                    </form>

                    <div className="new-account mt-3">
                      <p>
                        Already have an account? <Link to="/auth/login" className="text-primary">Login</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OtherBody>
  );
};

export default Register;
