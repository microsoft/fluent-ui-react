const ensureDefaultValuesProvided = options => {
  const defaultBindings = {
    getState: () => ({}) /* empty object as state by default */,
    setState: () => {} /* do nothing */,
  }

  options.bindings = { ...defaultBindings, ...options.bindings }

  return options
}

class StateManager {
  static create(unsafeOptions) {
    const options: any = ensureDefaultValuesProvided(unsafeOptions)

    const stateManager: any = new StateManager(options)

    stateManager.getState = options.bindings.getState

    // assign actions
    Object.keys(options.actions).forEach(actionName => {
      stateManager[actionName] = (userArgs, skipSetState = false) => {
        const prevState = stateManager.getState()
        const clonedStateManager: any = Object.assign({}, stateManager)

        Object.keys(options.actions).forEach(otherActionName => {
          if (otherActionName === actionName) {
            return
          }

          const originalActionHandler = clonedStateManager[otherActionName]

          clonedStateManager[otherActionName] = () => originalActionHandler(userArgs, true)
        })

        clonedStateManager.setState = stateDiff => {
          options.bindings.setState({
            stateDiff,
            prevState,
            newState: { ...prevState, ...stateDiff },
            actionName,
            userArgs,
          })
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

  private constructor(private readonly options) {}

  public withBindings(bindings) {
    const updatedOptions = { ...this.options, ...{ bindings } }
    return StateManager.create(updatedOptions)
  }
}

export default StateManager
