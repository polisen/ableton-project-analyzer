import * as React from 'react';

import { ThemeProvider } from 'styled-components';

const theme = {
  background: {
    main: '#121212',
    highlight: '#262626',
    fraction: 'rgba(255,255,255,.08)',
    ffraction: 'rgba(255,255,255,.20)',
  },
};

export default function ThemeWrapper({ children }: any) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}
