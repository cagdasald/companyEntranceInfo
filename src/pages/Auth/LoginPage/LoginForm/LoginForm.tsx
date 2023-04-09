import { Form, Input } from 'antd';
import React from 'react';
import AppButton from '../../../../components/Buttons/AppButton/AppButton';
import './LoginForm.scss';

interface IProps {
  isLoading: boolean;
  callbackSubmit: (values: FormValuesLogin) => void;
}

export interface FormValuesLogin {
  email: string;
  password: string;
}

function LoginForm(props: IProps) {
  const handleFinish = (values: FormValuesLogin): void => {
    props.callbackSubmit(values);
  };

  return (
    <Form id="login-form" onFinish={handleFinish}>
      <Form.Item
        name="email"
        rules={[
          { type: 'email', message: '' },
          { required: true, message: '' },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item name="password" rules={[{ required: true, message: '' }]}>
        <Input.Password placeholder="Password" />
      </Form.Item>

      <AppButton htmlType="submit" isLoading={props.isLoading}>
        Login
      </AppButton>
    </Form>
  );
}

export default LoginForm;
