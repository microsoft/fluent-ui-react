/**
 * We need to return value from 'props' instead of 'state',
 * if identical key is defined there.
 */
function withControlledState<TProps, TState>(
  getProps: () => TProps,
  getState: () => TState,
): () => TProps & TState {
  return () => ({
    ...getState(),
    ...getProps(),
  })
}

export default withControlledState
