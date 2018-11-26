import * as React from 'react'

import { childrenExist, createShorthandFactory, UIComponent } from '../../lib'
import { Extendable } from '../../../types/utils'
import {
  UIComponentProps,
  ChildrenComponentProps,
  ContentNodeComponentProps,
} from '../../lib/commonPropInterfaces'
import {
  commonUIComponentPropTypes,
  childrenComponentPropTypes,
  contentNodeComponentPropsTypes,
} from '../../lib/commonPropTypes'

export interface HeaderDescriptionProps
  extends UIComponentProps<any, any>,
    ChildrenComponentProps,
    ContentNodeComponentProps {}

/**
 * A header's description provides more detailed information.
 */
class HeaderDescription extends UIComponent<Extendable<HeaderDescriptionProps>, any> {
  static create: Function

  static className = 'ui-header__description'

  static displayName = 'HeaderDescription'

  static propTypes = {
    ...commonUIComponentPropTypes,
    ...childrenComponentPropTypes,
    ...contentNodeComponentPropsTypes,
  }

  static defaultProps = {
    as: 'p',
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

HeaderDescription.create = createShorthandFactory(HeaderDescription, 'content')

export default HeaderDescription
