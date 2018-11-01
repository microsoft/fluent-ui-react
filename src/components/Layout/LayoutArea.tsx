import * as React from 'react'
import * as PropTypes from 'prop-types'

import { childrenExist, createShorthandFactory, customPropTypes, UIComponent } from '../../lib'
import { Extendable } from '../../../types/utils'
import { ComponentVariablesInput, ComponentSlotStylesInput } from '../../themes/types'

export interface ILayoutProps {
  as?: any
  content?: any
  debug?: boolean
  truncate?: boolean
  vertical?: boolean
  size?: string
  styles?: ComponentSlotStylesInput
  variables?: ComponentVariablesInput
}

/**
 * A Layout Area contains the content of a Layout.
 */
class LayoutArea extends UIComponent<Extendable<ILayoutProps>, any> {
  static create: Function

  static className = 'ui-layout__area'

  static displayName = 'LayoutArea'

  static propTypes = {
    /** An element type to render as. */
    as: customPropTypes.as,

    debug: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Truncate text if it does not fit. */
    truncate: PropTypes.bool,

    /** The size of the layout as a CSS length string. */
    size: PropTypes.string,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  renderComponent({ ElementType, classes, rest }) {
    const { children, content } = this.props

    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

LayoutArea.create = createShorthandFactory(LayoutArea, content => ({ content }))

export default LayoutArea
