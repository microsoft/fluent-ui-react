import { Action, Actions, Manager, ManagerConfig } from './types'

const createManager = <State, ActionNames extends keyof any>(
  config: ManagerConfig<State, ActionNames>,
): Manager<State, ActionNames> => {
  const { actions, debug, middleware = [], sideEffects = [], state } = config

  const _state: State = Object.assign({}, state) as State

  const getState = (): State => Object.assign({}, _state)
  const setState = (partial: Partial<State> | void): State => Object.assign(_state, partial)

  const manager: Manager<State, ActionNames> = {
    actions: {} as Actions<State, ActionNames>,
    get state() {
      return getState()
    },
  }

  // assign actions to manager's api
  Object.keys(actions).forEach(actionName => {
    const enhancedAction = (...args: any[]) => {
      applyAction(actions[actionName] as Action<State, ActionNames>, ...args)
      applyMiddleware()
      applySideEffects()
    }

    manager.actions[actionName] = enhancedAction
  })

  const applyAction = (action: Action<State, ActionNames>, ...args: any[]) => {
    if (!action) return

    if (debug) console.log('manager ACTION', action.name || 'Anonymous')
    setState(action(...args)(getState(), actions))
  }

  const applyMiddleware = () => {
    const prevState = getState()

    middleware.forEach((middlewareItem, index) => {
      if (debug) {
        console.log(`manager MIDDLEWARE[${index}]`, {
          prev: prevState,
          next: getState(),
        })
      }
      setState(middlewareItem(prevState, getState(), actions))
    })
  }

  const applySideEffects = (): void => {
    if (!sideEffects) return

    sideEffects.forEach((sideEffect, index) => {
      if (debug) console.log(`manager SIDE_EFFECT[${index}]`)
      sideEffect(manager)
    })
  }

  return manager
}

export default createManager
