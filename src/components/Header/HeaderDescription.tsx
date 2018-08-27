import * as PropTypes from 'prop-types'
import * as React from 'react'

import { childrenExist, createShorthandFactory, customPropTypes, UIComponent } from '../../lib'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'
import { Extendable, ReactChildren } from '../../../types/utils'

export interface IHeaderDescriptionProps {
  as?: any
  children?: ReactChildren
  className?: string
  content?: React.ReactNode
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
}

/**
 * Headers may contain description.
 */
class HeaderDescription extends UIComponent<Extendable<IHeaderDescriptionProps>, any> {
  static create: Function

  static className = 'ui-header__description'

  static displayName = 'HeaderDescription'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    as: 'p',
  }

  static handledProps = ['as', 'children', 'className', 'content', 'styles', 'variables']

  renderComponent({ ElementType, classes, rest }) {
    const { children, content } = this.props
    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

HeaderDescription.create = createShorthandFactory(HeaderDescription, content => ({ content }))

export default HeaderDescription
