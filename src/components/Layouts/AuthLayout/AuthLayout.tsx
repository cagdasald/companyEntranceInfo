import React, { ReactNode } from 'react';
import './AuthLayout.scss';

interface IProps {
  children: ReactNode;
}

function AuthLayout(props: IProps) {
  return <div id="auth-layout">{props.children}</div>;
}

export default AuthLayout;
