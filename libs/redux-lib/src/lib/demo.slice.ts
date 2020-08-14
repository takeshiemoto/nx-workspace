import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const DEMO_FEATURE_KEY = 'demo';

/*
 * Update these interfaces according to your requirements.
 */
export interface DemoEntity {
  id: number;
}

export interface DemoState extends EntityState<DemoEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const demoAdapter = createEntityAdapter<DemoEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchDemo())
 * }, [dispatch]);
 * ```
 */
export const fetchDemo = createAsyncThunk(
  'demo/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getDemos()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialDemoState: DemoState = demoAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
});

export const demoSlice = createSlice({
  name: DEMO_FEATURE_KEY,
  initialState: initialDemoState,
  reducers: {
    add: demoAdapter.addOne,
    remove: demoAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDemo.pending, (state: DemoState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchDemo.fulfilled,
        (state: DemoState, action: PayloadAction<DemoEntity[]>) => {
          demoAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchDemo.rejected, (state: DemoState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const demoReducer = demoSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(demoActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const demoActions = demoSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllDemo);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = demoAdapter.getSelectors();

export const getDemoState = (rootState: unknown): DemoState =>
  rootState[DEMO_FEATURE_KEY];

export const selectAllDemo = createSelector(getDemoState, selectAll);

export const selectDemoEntities = createSelector(getDemoState, selectEntities);
