import React from 'react';
import { AppProps } from 'next/app';

export const App = ({ Component, pageProps }: AppProps) => {
  return (
    <React.StrictMode>
      <Component {...pageProps} />
    </React.StrictMode>
  );
};

export default App;
