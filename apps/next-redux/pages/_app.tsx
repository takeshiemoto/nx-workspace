import React from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@nx-workspace/redux-lib';

export const App = ({ Component, pageProps }: AppProps) => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </React.StrictMode>
  );
};

export default App;
