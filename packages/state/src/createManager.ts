import { Action, ManagerActions, Manager, ManagerConfig, ManagerAction } from './types'

const createManager = <State, ActionNames extends string>(
  config: ManagerConfig<State, ActionNames>,
): Manager<State, ActionNames> => {
  const { actions, debug, middleware = [], sideEffects = [], state } = config as Required<
    ManagerConfig<State, ActionNames>
  >

  const _state: State = Object.assign({}, state) as State

  const getState = (): State => Object.assign({}, _state)
  const setState = (partial: Partial<State>): State => Object.assign(_state, partial)

  const manager: Manager<State, ActionNames> = {
    actions: {} as ManagerActions<State, ActionNames>,
    get state() {
      return getState()
    },
  }

  // assign actions to manager's api
  Object.keys(actions).forEach((actionName: ActionNames) => {
    const enhancedAction: ManagerAction<State, ActionNames> = (...args: any[]) => {
      applyAction(actions[actionName], ...args)
      applyMiddleware()
      applySideEffects()
    }

    manager.actions[actionName] = enhancedAction
  })

  const applyAction = (action: Action<State, ActionNames>, ...args: any[]) => {
    if (!action) return
    if (debug) console.log('manager ACTION', action.name || 'Anonymous')

    const actionResult = action(...args)(getState(), actions)
    if (actionResult) setState(actionResult)
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
