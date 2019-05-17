import { Manager, ManagerFactory, Middleware } from '@stardust-ui/state'
import * as React from 'react'

import { getDefinedAutoControlledProps, getInitialAutoControlledState } from './stateUtils'

const useStateManager = <
  State,
  Actions,
  Props extends Partial<State>,
  AProps extends keyof State & string
>(
  createStateManager: ManagerFactory<State, Actions>,
  props: Props,
  autoControlledProps: string[] = [],
): Manager<State, Actions> => {
  const definedAutoControlledProps = getDefinedAutoControlledProps(autoControlledProps, props)
  const autoControlledValues = autoControlledProps.reduce(
    (values: any[], propName: AProps) => [...values, props[propName]],
    [],
  )

  const overrideAutoControlledProps: Middleware<State, Actions> = (
    _prevState: State,
    nextState: State,
  ) => ({
    ...nextState,
    ...definedAutoControlledProps,
  })

  // Heads up! setState() is used only for triggering rerenders stateManager is SSOT()
  const [, setState] = React.useState()
  const syncState = React.useCallback(({ state }) => setState(state), [])

  const latestManager = React.useRef<Manager<State, Actions> | null>(null)
  const manager = React.useMemo(() => {
    console.log('Manager', latestManager)
    const initialState = latestManager.current
      ? { ...latestManager.current, ...definedAutoControlledProps }
      : getInitialAutoControlledState(
          /* TODO: fix types */
          // @ts-ignore
          autoControlledProps,
          props,
        )

    // @ts-ignore
    return createStateManager({
      debug: true,
      // TODO: defaultOpen prop
      state: initialState,
      middleware: [overrideAutoControlledProps],
      sideEffects: [syncState],
    })
  }, autoControlledValues)

  latestManager.current = manager

  return manager
}

export default useStateManager
