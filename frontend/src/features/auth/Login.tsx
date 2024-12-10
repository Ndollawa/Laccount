import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {jwtDecode} from 'jwt-decode';
import { FaRegUserCircle, FaKeycdn, FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import {PulseLoader} from 'react-spinners';
import { useCompanyInfo, useLandingConfig } from '@dashboard/pages/Settings/slices/settings.slice';
import { useLoginMutation } from './slices/authApi.slice';
import { setCredentials } from './slices/auth.slice';
import OtherBody from '@dashboard/components/OtherBody';
import useToggle from '@hooks/useToggle';
import { AuthProps } from '@props/authProps';

interface LoginFormInputs {
  user: string;
  password: string;
}

interface ErrMessages {
  type: string | undefined;
  msg: string | undefined;
}

const BRAND_ASSETS = import.meta.env.VITE_BRAND_ASSETS;

const Login: React.FC = () => {
  const { settings: { companyDetails:{siteName }={}} = {} } = useSelector(useCompanyInfo);
  const { settings: { siteImages: { logo } = {} } = {} } = useSelector(useLandingConfig);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [login, { isLoading: isLoadingLogin }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [check, toggleCheck] = useToggle('persist', false);
  const [errMsg, setErrMsg] = useState<ErrMessages>();

  const from = location?.state?.from?.pathname || '/dashboard';

  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginFormInputs>();

  useEffect(() => {
    setErrMsg(undefined); // Clear error message when inputs change
  }, []);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const { accessToken } = await login(data).unwrap();
      const decodedToken: AuthProps['token'] | undefined = accessToken ? jwtDecode(accessToken) : undefined;
      const user_info = decodedToken?.sub;

      dispatch(setCredentials({ accessToken, user_info }));
      reset();
      navigate(from);
    } catch (err: any) {
      if (!err) {
        setErrMsg({ type: 'danger', msg: 'No Server Response' });
      } else if (err.status === 400) {
        setErrMsg({ type: 'warning', msg: 'Missing form detail(s)' });
      } else if (err.status === 401) {
        setErrMsg({ type: 'warning', msg: 'Invalid Credentials' });
      } else {
        setErrMsg({ type: 'danger', msg: 'Login Failed' });
      }
    }
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

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
                      <Link to="/" className="brand-logo">
                        <img src={`${BRAND_ASSETS}${logo}`} alt={siteName} width="150" />
                      </Link>
                    </div>
                    <h4 className="text-center mb-4">Sign in to your account</h4>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
                      {errMsg && (
                        <div className={`alert alert-${errMsg.type} alert-dismissible fade show`} role="alert">
                          <strong>{errMsg.type === 'warning' ? 'Warning!' : 'Error!'}</strong> {errMsg.msg}
                          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>setErrMsg({type:undefined, msg:undefined})}></button>
                        </div>
                      )}

                      <div className="form-group">
                        <label htmlFor="user"><strong>Email or Username</strong></label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaRegUserCircle />
                          </span>
                          <input
                            type="text"
                            className={`form-control ${errors.user ? 'is-invalid' : ''}`}
                            id="user"
                            {...register('user', { required: 'Username is required' })}
                          />
                          {errors.user && <div className="invalid-feedback">{errors.user.message}</div>}
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaKeycdn />
                          </span>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            id="password"
                            {...register('password', { required: 'Password is required' })}
                          />
                          <span className="input-group-text" onClick={toggleShowPassword}>
                            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                          </span>
                          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                        </div>
                      </div>

                      <div className="form-group form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="persist"
                          checked={check}
                          onChange={toggleCheck}
                        />
                        <label className="form-check-label" htmlFor="persist">Trust this Device?</label>
                      </div>

                      <div className="form-group d-flex justify-content-between">
                        <Link to="/forgot-password">Forgot Password?</Link>
                      </div>

                      <button type="submit" className="btn btn-primary w-100 d-flex gap-1 justify-content-center align-items-center">
                        {isLoadingLogin ? (
                          <>
                            Logging In
                            <PulseLoader loading={isLoadingLogin} color="#ffffff" size="0.85rem" />
                          </>
                        ) : (
                          'Login'
                        )}
                      </button>
                    </form>

                    <div className="new-account mt-3 text-center">
                      <p>Don't have an account? <Link className="text-primary" to="/auth/register">Register</Link></p>
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

export default Login;
