import { fetchDemo, demoAdapter, demoReducer } from './demo.slice';

describe('demo reducer', () => {
  it('should handle initial state', () => {
    const expected = demoAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(demoReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchDemos', () => {
    let state = demoReducer(undefined, fetchDemo.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = demoReducer(state, fetchDemo.fulfilled([{ id: 1 }], null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = demoReducer(
      state,
      fetchDemo.rejected(new Error('Uh oh'), null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});
