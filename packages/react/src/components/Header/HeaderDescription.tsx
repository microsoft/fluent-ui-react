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
  rtlTextContainer,
} from '../../lib'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'
import { ReactProps } from '../../types'

export interface HeaderDescriptionProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps,
    ColorComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default defaultBehavior
   */
  accessibility?: Accessibility
}

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
    accessibility: defaultBehavior,
    as: 'p',
  }

  renderComponent({ accessibility, ElementType, classes, unhandledProps }) {
    const { children, content } = this.props
    return (
      <ElementType
        {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
        {...accessibility.attributes.root}
        {...unhandledProps}
        className={classes.root}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

HeaderDescription.create = createShorthandFactory({
  Component: HeaderDescription,
  mappedProp: 'content',
})

export default HeaderDescription
