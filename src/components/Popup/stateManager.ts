const ensureDefaultValuesProvided = options => {
  const defaultBindings = {
    getState: () => ({}) /* empty object as state by default */,

    willSetState: ({ stateDiff }) => stateDiff /* one-to-one transform by default */,
    setState: () => {} /* do nothing */,
  }

  options.bindings = { ...defaultBindings, ...options.bindings }

  return options
}

class StateManager {
  public static create = unsafeOptions => {
    const options: any = ensureDefaultValuesProvided(unsafeOptions)

    const stateManager: any = new StateManager(options)

    stateManager.getState = options.bindings.getState

    // assign actions
    Object.keys(options.actions).forEach(actionName => {
      stateManager[actionName] = userArgs => {
        const prevState = stateManager.getState()
        const clonedStateManager: any = Object.assign({}, stateManager)

        Object.keys(options.actions).forEach(otherActionName => {
          if (otherActionName === actionName) return

          const originalActionHandler = clonedStateManager[otherActionName]
          clonedStateManager[otherActionName] = () => originalActionHandler(userArgs)
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

          options.bindings.setState({
            stateDiff: preprocessedStateDiff,
            prevState,
            newState: { ...prevState, ...preprocessedStateDiff },
            actionName,
            userArgs,
          })
        }

        options.actions[actionName](clonedStateManager)
      }
    })

    return stateManager
  }

  private constructor(private readonly options) {}

  public withBindings(bindings) {
    const updatedOptions = { ...this.options, ...{ bindings } }
    return StateManager.create(updatedOptions)
  }
}

export default StateManager
