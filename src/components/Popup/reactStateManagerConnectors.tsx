import * as _ from 'lodash'

class ReactConnector {
  private readonly mapStateToComponentState = state => state
  private readonly mapComponentStateToState = state => state

  public constructor(private readonly stateManager, options?) {
    options &&
      options.mapStateToComponentState &&
      (this.mapStateToComponentState = options.mapStateToComponentState)
    options &&
      options.mapComponentStateToState &&
      (this.mapComponentStateToState = options.mapComponentStateToState)
  }

  public to = componentRef => {
    return this.stateManager.withBindings({
      getState: () => {
        return componentRef.state
      },

      setState: ({ stateDiff }) => {
        componentRef.setState(stateDiff)
      },
    })
  }

  /**
   * where autoControlledPropsSpec = { propName: propChangeHandlerName, ... }
   */
  public toAutoControlled = (componentRef, autoControlledPropsSpec) => {
    const autoControlledPropNames = Object.keys(autoControlledPropsSpec)

    return this.stateManager.withBindings({
      /* derives state from component */
      getState: () => {
        // AUTOCONTROLLED state logic
        // note, sloppy implementation, but just to provide an idea:
        // - 'state' that is seen by state manager could be composed from different data sources in the way necessary
        //
        // edge cases of null/undefined are not covered, but this is pretty easy implementation task
        return this.mapComponentStateToState({ ...componentRef.state, ...componentRef.props })
      },

      // what it should do if autocontrolled logic?
      // - fire events for autocontrolled props
      // - set state for others
      // -- all side effects should be handled as part of the component's logic
      // -- i.e., componentDidMoount and componentDidUpdate (great candidates to be replaced by useEffect() hook)
      setState: ({ stateDiff, newState, userArgs }) => {
        const { eventArgs } = userArgs

        const componentStateDiff = this.mapStateToComponentState(stateDiff)

        const componentStateChanges = {}
        Object.keys(componentStateDiff).forEach(changedPropName => {
          const isControlledByProps =
            (autoControlledPropNames as any).includes(changedPropName) &&
            componentRef.props[changedPropName] !== undefined

          if (isControlledByProps) {
            const changeHandlerName = autoControlledPropsSpec[changedPropName]
            _.invoke(componentRef.props, changeHandlerName, eventArgs, newState)
          } else {
            componentStateChanges[changedPropName] = componentStateDiff[changedPropName]
          }
        })

        if (Object.keys(componentStateChanges).length > 0) {
          componentRef.setState(componentStateChanges)
        }
      },
    })
  }

  /**
   * just names mapping logic, should be used to map stateManager's state prop names to component state's prop names:
   *
   * connect(stateManager).withNamesMapping({
   *    'open': 'isOpen'
   *    ...
   * })
   */
  public withNamesMapping(stateToComponentState) {
    const relevantStatePropNames = Object.keys(stateToComponentState)
    const relevantComponentStatePropNames = relevantStatePropNames.reduce((acc, statePropName) =>
      (acc as any).push(stateToComponentState[statePropName]),
    )

    const componentStateToState = Object.keys(stateToComponentState).reduce(
      (acc, statePropName) => {
        const componentStatePropName = stateToComponentState[statePropName]
        acc[componentStatePropName] = statePropName

        return acc
      },
      {},
    )

    return new ReactConnector(this.stateManager, {
      mapStateToComponentState: state =>
        Object.keys(state)
          .filter(statePropName => (relevantStatePropNames as any).includes(statePropName))
          .reduce((acc, statePropName) => {
            const componentStatePropName = stateToComponentState[statePropName]
            acc[componentStatePropName] = state[statePropName]

            return acc
          }, {}),
      mapComponentStateToState: componentState =>
        Object.keys(componentState)
          .filter(componentStatePropName =>
            (relevantComponentStatePropNames as any).includes(componentStatePropName),
          )
          .reduce((acc, componentStatePropName) => {
            const statePropName = componentStateToState[componentStatePropName]
            acc[statePropName] = componentState[componentStatePropName]

            return acc
          }, {}),
    })
  }
}

export const connect = stateManager => {
  return new ReactConnector(stateManager)
}
