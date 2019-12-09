import { AnyAction, EnhancedActions, Manager, ManagerFactory, SideEffect } from '@fluentui/state'
import * as React from 'react'

type UseStateManagerOptions<State> = {
  mapPropsToInitialState?: () => Partial<State>
  mapPropsToState?: () => Partial<State>
  sideEffects?: SideEffect<State>[]
}

const getDefinedProps = <Props extends Record<string, any>>(props: Props): Partial<Props> => {
  const definedProps: Partial<Props> = {}

  Object.keys(props).forEach(propName => {
    if (props[propName] !== undefined) {
      ;(<Record<string, any>>definedProps)[propName] = props[propName]
    }
  })

  return definedProps
}

const useStateManager = <
  State extends Record<string, any>,
  Actions extends Record<string, AnyAction>
>(
  managerFactory: ManagerFactory<State, Actions>,
  options: UseStateManagerOptions<State> = {},
): [Readonly<State>, Readonly<Actions>] => {
  const {
    mapPropsToInitialState = () => ({} as Partial<State>),
    mapPropsToState = () => ({} as Partial<State>),
    sideEffects = [],
  } = options
  const latestManager = React.useRef<Manager<State, Actions> | null>(null)

  // Heads up! forceUpdate() is used only for triggering rerenders stateManager is SSOT()
  const [, forceUpdate] = React.useState()
  const syncState = React.useCallback(
    (_prevState: State, nextState: State) => forceUpdate(nextState),
    [],
  )

  // If manager exists, the current state will be used
  const initialState = latestManager.current
    ? latestManager.current.state
    : getDefinedProps(mapPropsToInitialState())

  latestManager.current = managerFactory({
    // Factory has already configured actions
    actions: {} as EnhancedActions<State, Actions>,
    state: { ...initialState, ...getDefinedProps(mapPropsToState()) },
    sideEffects: [...sideEffects, syncState],
  })

  // We need to pass exactly `manager.state` to provide the same state object during the same render
  // frame.
  // It keeps behavior consistency between React state tools and our managers
  // https://github.com/facebook/react/issues/11527#issuecomment-360199710

  if (process.env.NODE_ENV === 'production') {
    return [latestManager.current.state, latestManager.current.actions]
  }

  // Object.freeze() is used only in dev-mode to avoid usage mistakes
  return [Object.freeze(latestManager.current.state), Object.freeze(latestManager.current.actions)]
}

export default useStateManager
