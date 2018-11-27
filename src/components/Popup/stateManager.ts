const ensureDefaultValuesProvided = options => {
  const createDefaultBindings = () => {
    let state = {}

    return {
      getState: () => state /* empty object as state by default */,

      willSetState: ({ stateDiff }) => stateDiff /* one-to-one transform by default */,

      setState: ({ stateDiff }) => {
        state = { ...state, ...stateDiff }
      } /* do nothing */,
    }
  }

  options.onStateChange = options.onStateChange || (() => {}) /* do nothing */
  options.bindings = { ...createDefaultBindings(), ...options.bindings }

  return options
}

class StateManager {
  static create(unsafeOptions) {
    const options = ensureDefaultValuesProvided(unsafeOptions)

    const stateManager: any = new StateManager(options)

    stateManager.getState = options.bindings.getState

    // assign actions
    Object.keys(options.actions).forEach(actionName => {
      stateManager[actionName] = (userArgs, skipSetState = false) => {
        const prevState = stateManager.getState()
        const clonedStateManager = Object.assign({}, stateManager)

        Object.keys(options.actions).forEach(otherActionName => {
          if (otherActionName === actionName) return

          const originalActionHandler = clonedStateManager[otherActionName]

          clonedStateManager[otherActionName] = () => originalActionHandler(userArgs, true)
        })

        // decorate state manager's methods
        const willSetState = stateDiff =>
          options.bindings.willSetState({
            prevState,
            stateDiff,
            userArgs,
            actionName,
          })

        clonedStateManager.setState = stateDiff => {
          const preprocessedStateDiff = willSetState(stateDiff)

          const setStateArg = {
            stateDiff: preprocessedStateDiff,
            prevState,
            newState: { ...prevState, ...preprocessedStateDiff },
            actionName,
            userArgs,
          }

          options.bindings.setState(setStateArg)
          options.onStateChange(setStateArg)
        }

        const newState = options.actions[actionName](clonedStateManager)
        if (!skipSetState) {
          clonedStateManager.setState(newState)
        }

        return newState
      }
    })

    return stateManager
  }

  constructor(options) {
     (this as any).options = options
  }

  withBindings(bindings) {
    const updatedOptions = { ...(this as any).options, ...{ bindings } }
    return StateManager.create(updatedOptions)
  }

  withStateChangeHandler(onStateChange) {
    const updatedOptions = { ...(this as any).options, ...{ onStateChange } }
    return StateManager.create(updatedOptions)
  }
}

export default StateManager
