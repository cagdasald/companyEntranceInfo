import { Button } from 'antd';
import { ReactNode } from 'react';
import './AppButton.scss';

interface IProps {
  children: ReactNode;
  htmlType?: 'submit';
  isLoading?: boolean;
  onClick?: () => void;
}

function AppButton(props: IProps) {
  return (
    <Button
      id="app-button"
      type="primary"
      htmlType={props.htmlType ?? 'button'}
      disabled={props.isLoading}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
}

export default AppButton;
