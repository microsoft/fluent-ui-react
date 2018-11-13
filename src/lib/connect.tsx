import * as React from 'react'
import UIComponent from './UIComponent'
import * as PropTypes from 'prop-types'
import { ObjectOf } from 'types/utils'

// just helper function
const getDisplayName = Component => {
  return (
    Component.displayName ||
    Component.name ||
    (typeof Component === 'string' && Component.length > 0 ? Component : 'Unknown')
  )
}

export type StardustRenderProps = {
  accessibility: any
  children: any
  classes: ObjectOf<string>
  styles: any
  variables: any
}

export type ConnectOptions = {
  // specific displayName, otherwise name form component will be fetched
  displayName?: string

  // maps Stardust bits to component's props
  mapToComponentProps: (stardustProps: StardustRenderProps) => any

  // accessibility, defaultProps, anything..
}

// -------------------------
// CONNECT
// -------------------------
// Connects third-party components to Stardust
//
// - will automatically fetch component name, if displayName is not provided
// - default handled props are: 'styles', 'accessibility', 'variables', more?;
// - other props passed down by the component's chain
// - doesn't render ANY wrapper DOM elements
// - fully relies on Stardust evaluation mechanisms for all the bits passed to custom component
const connect = (options: ConnectOptions) => Component => {
  const displayName = options.displayName || `Stardust.${getDisplayName(Component)}`

  return class StardustConnector extends UIComponent<any, any> {
    public static displayName = displayName

    public static propTypes = {
      /** Accessibility behavior if overridden by the user. */
      accessibility: PropTypes.func,

      children: PropTypes.node,

      /** Additional CSS styles to apply to the component instance.  */
      styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

      /** Override for theme site variables to allow modifications of component styling via themes. */
      variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    }

    // FULLY REUSES Stardust evaluation mechanisms for all the bits provided
    renderComponent({ classes, styles, variables, accessibility, rest }) {
      const { children } = this.props
      const mappedProps = options.mapToComponentProps({
        children,
        classes,
        styles,
        accessibility,
        variables,
      })

      return <Component {...mappedProps} {...rest} />
    }
  }
}

export default connect
