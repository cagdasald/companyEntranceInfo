import { ThemeConfig } from 'antd/es/config-provider';
import { CSSProperties } from 'react';

export class UI {
  static getTheme = (): ThemeConfig => {
    return {
      token: {
        // TODO Set primary color
        colorPrimary: '#002d72',
      },
    };
  };

  static modalMaskStyle(): CSSProperties {
    return { backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' };
  }
}
