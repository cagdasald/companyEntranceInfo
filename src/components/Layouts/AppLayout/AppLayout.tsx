import React, { ReactNode } from 'react';
import './AppLayout.scss';

interface IProps {
  children: ReactNode;
}

function AppLayout(props: IProps) {
  return <div id="app-layout">{props.children}</div>;
}

export default AppLayout;
