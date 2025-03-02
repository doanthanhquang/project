import { RefineThemes } from '@refinedev/antd';
import { ConfigProvider, theme } from 'antd';
import { createIntl, ProConfigProvider } from '@ant-design/pro-provider';
import viVN from 'antd/lib/locale/vi_VN';
import { type PropsWithChildren, createContext, useEffect, useState } from 'react';
import viVNPro from '../../locales/vi/pro-components.json';

type ColorModeContextType = {
  mode: string;
  setMode: (mode: string) => void;
};

export const ColorModeContext = createContext<ColorModeContextType>({} as ColorModeContextType);

export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const colorModeFromLocalStorage = localStorage.getItem('colorMode');
  const isSystemPreferenceDark = window?.matchMedia('(prefers-color-scheme: dark)').matches;

  const systemPreference = isSystemPreferenceDark ? 'dark' : 'light';
  const [mode, setMode] = useState(colorModeFromLocalStorage || systemPreference);

  useEffect(() => {
    window.localStorage.setItem('colorMode', mode);
  }, [mode]);

  const setColorMode = () => {
    if (mode === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  const { darkAlgorithm, defaultAlgorithm } = theme;

  return (
    <ColorModeContext.Provider
      value={{
        setMode: setColorMode,
        mode,
      }}
    >
      <ConfigProvider
        locale={viVN}
        // you can change the theme colors here. example: ...RefineThemes.Magenta,
        componentSize="small"
        // variant="filled"
        theme={{
          ...RefineThemes.Blue,
          algorithm: defaultAlgorithm,
          components: {
            Form: {
              itemMarginBottom: 4,
            },
            Tabs: {
              cardPaddingSM: '4px 12px',
              // horizontalMargin: '0 0 0 0',
            },
          },
        }}
      >
        <ProConfigProvider intl={createIntl('vi-VN', viVNPro)}>{children}</ProConfigProvider>
      </ConfigProvider>
    </ColorModeContext.Provider>
  );
};
