import * as _ from 'lodash'
import * as React from 'react'

export const withControlledState = (stateManager, componentRef) => {
  return stateManager.withBindings({
    getState: () => {
      return componentRef.state
    },

    setState: ({ stateDiff }) => {
      componentRef.setState(stateDiff)
    },
  })
}

export const connect = (stateManager, ComponentType, mapStateToProps) => {
  class WithStateManager extends React.Component {
    private stateManager: any
    constructor(props, context) {
      super(props, context)

      this.stateManager = stateManager.withControlledState(this)
    }

    componentDidMount() {
      this.stateManager.init()
    }

    render() {
      const augmentedProps = {
        ...mapStateToProps(this.stateManager.getState()),
        ...this.props,
        ...{ stateManager: this.stateManager },
      }

      return <ComponentType {...augmentedProps} />
    }
  }

  return WithStateManager
}

export const withAutoControlledState = (stateManager, componentRef) => {
  return stateManager.withBindings({
    /* derives state from component */
    getState: () => {
      // AUTOCONTROLLED state logic
      // note, sloppy implementation, but just to provide an idea:
      // - 'state' that is seen by state manager could be composed from different data sources in the way necessary
      //
      // edge cases of null/undefined are not covered, but this is pretty easy implementation task
      return { ...componentRef.state, ...componentRef.props }
    },

    /*
        * AUTOCONTROLLED implementation for absolute match of stateManager's and component's state.
        * - this hook acts like a filter for the state changes that should be applied
        */
    // -------------
    // willSetState: ({ prevState, stateDiff, args, actionName }) => {
    //   return excludeControlledProps(stateDiff, this.props)
    // },

    // so, what it should do?
    // - fire events for autocontrolled props
    // - set state for others
    // -- all side effects should be handled as part of the component's logic
    // -- i.e., componentDidMoount and componentDidUpdate (great candidates to be replaced by useEffect() hook)
    setState: ({ stateDiff, newState, userArgs }) => {
      const { eventArgs } = userArgs

      // although state doesn't precisely reflect autocontrolled 'state',
      // the state of stateManager is always properly defined
      const componentStateChanges = {}
      Object.keys(stateDiff).forEach(changedPropName => {
        if ((Object.keys(componentRef.props) as any).includes(changedPropName)) {
          const changeHandlerName = `onOpenChange` // SLOPPY PLACE for now
          _.invoke(componentRef.props, changeHandlerName, eventArgs, newState)
        } else {
          componentStateChanges[changedPropName] = stateDiff[changedPropName]
        }
      })

      if (Object.keys(componentStateChanges).length > 0) {
        componentRef.setState(componentStateChanges)
      }
    },
  })
}
