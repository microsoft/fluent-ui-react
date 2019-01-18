import * as PropTypes from 'prop-types'
import * as React from 'react'

import { UIComponent, childrenExist, customPropTypes, createShorthandFactory } from '../../lib'
import { ComponentSlotStyle, ComponentVariablesInput } from '../../themes/types'

export type $DisplayNameProps = {
  as?: any
  children?: React.ReactChildren
  content?: React.ReactNode
  styles?: ComponentSlotStyle
  variables?: ComponentVariablesInput
}

class $DisplayName extends UIComponent<$DisplayNameProps, any> {
  static create: Function

  static className = 'ui-$kebab-display-name'

  static displayName = '$DisplayName'

  static handledProps = ['as', 'children', 'content', 'styles', 'variables']

  static propTypes = {
    /** An element type to render as. */
    as: customPropTypes.as,

    /** Define your own children. */
    children: PropTypes.node,

    /** Shorthand for primary content. */
    content: PropTypes.any,

    /** Custom styles to be applied to the component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied to the component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  renderComponent({ ElementType, classes, unhandledProps, styles, variables }) {
    const { children, content } = this.props

    return (
      <ElementType {...unhandledProps} className={classes.root}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

$DisplayName.create = createShorthandFactory($DisplayName, content => ({ content }))

export default $DisplayName
