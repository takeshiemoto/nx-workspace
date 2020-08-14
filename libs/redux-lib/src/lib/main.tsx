import React from 'react';

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { DEMO_FEATURE_KEY, demoReducer } from './demo.slice';

export const store = configureStore({
  reducer: { [DEMO_FEATURE_KEY]: demoReducer },
  // Additional middleware can be passed to this array
  middleware: [...getDefaultMiddleware()],
  devTools: process.env.NODE_ENV !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
});

export default store;
