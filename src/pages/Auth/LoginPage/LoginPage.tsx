import React from 'react';
import { LoginRequest } from '../../../core/models/requests/login.request';
import { login } from '../../../core/services/auth/login/login.slice';
import { useAppDispatch, useAppSelector } from '../../../core/services/hooks';
import LoginForm, { FormValuesLogin } from './LoginForm/LoginForm';
import './LoginPage.scss';

function LoginPage() {
  const loginState = useAppSelector((state) => state.auth.login);
  const dispatch = useAppDispatch();

  const handleSubmit = (values: FormValuesLogin) => {
    const request: LoginRequest = {
      ...values,
    };
    dispatch(login(request));
  };

  return (
    <div id="login-page" className="page">
      <div className="page-content">
        <LoginForm
          isLoading={loginState.loading}
          callbackSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default LoginPage;
