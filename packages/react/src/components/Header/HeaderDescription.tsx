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
import { WithAsProp, withSafeTypeForAs } from '../../types'

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

class HeaderDescription extends UIComponent<WithAsProp<HeaderDescriptionProps>, any> {
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

/**
 * A HeaderDescription provides more detailed information about the Header.
 */
export default withSafeTypeForAs<typeof HeaderDescription, HeaderDescriptionProps, 'p'>(
  HeaderDescription,
)
