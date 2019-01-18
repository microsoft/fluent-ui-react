import * as React from 'react'

import {
  childrenExist,
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  ColorComponentProps,
  addRtlSupport,
} from '../../lib'
import { ReactProps } from '../../../types/utils'

export interface HeaderDescriptionProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps,
    ColorComponentProps {}

/**
 * A header's description provides more detailed information.
 */
class HeaderDescription extends UIComponent<ReactProps<HeaderDescriptionProps>, any> {
  static create: Function

  static className = 'ui-header__description'

  static displayName = 'HeaderDescription'

  static propTypes = {
    ...commonPropTypes.createCommon({ color: true }),
  }

  static defaultProps = {
    as: 'p',
  }

  renderComponent({ ElementType, classes, unhandledProps }) {
    const { children, content } = this.props
    return (
      <ElementType {...unhandledProps} className={classes.root}>
        {addRtlSupport(childrenExist(children) ? children : content)}
      </ElementType>
    )
  }
}

HeaderDescription.create = createShorthandFactory(HeaderDescription, 'content')

export default HeaderDescription
