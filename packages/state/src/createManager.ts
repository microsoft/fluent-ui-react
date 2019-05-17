import { Action, Manager, ManagerConfig } from './types'

const assign = Object.assign
const clone = (object: any) => assign({}, object)

const createManager = <S, A extends Record<string, Action<S, A>>>(
  config: ManagerConfig<S, A>,
): Manager<S, A> => {
  const { actions, debug, middleware = [], sideEffects = [], state } = config

  const _state: S = clone(state)

  const getState = (): S => clone(_state)
  const setState = (partial: Partial<S> | void): S => assign(_state, partial)

  const manager: Manager<S, A> = {
    actions: {} as A,
    get state() {
      return getState()
    },
  }

  // assign actions to manager's api
  Object.keys(actions).forEach(actionName => {
    const enhancedAction = (...args: any[]) => {
      applyAction(actions[actionName] as Action<S, A>, ...args)
      applyMiddleware()
      applySideEffects()
    }

    // TODO: fix typings
    // @ts-ignore
    manager.actions[actionName] = enhancedAction
  })

  const applyAction = (action: Action<S, A>, ...args: any[]) => {
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
