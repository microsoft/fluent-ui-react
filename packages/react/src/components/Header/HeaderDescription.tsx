import { Accessibility } from '@fluentui/accessibility'
import * as React from 'react'

import {
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  commonPropTypes,
  ColorComponentProps,
  rtlTextContainer,
  ShorthandFactory,
} from '../../utils'

import { WithAsProp, withSafeTypeForAs } from '../../types'

export interface HeaderDescriptionProps extends UIComponentProps, ColorComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility
}

class HeaderDescription extends UIComponent<WithAsProp<HeaderDescriptionProps>, any> {
  static create: ShorthandFactory<HeaderDescriptionProps>

  static className = 'ui-header__description'

  static displayName = 'HeaderDescription'

  static propTypes = {
    ...commonPropTypes.createCommon({ color: true }),
  }

  static defaultProps = {
    as: 'p',
  }

  renderComponent({ accessibility, ElementType, classes, unhandledProps }) {
    const { children } = this.props

    return (
      <ElementType
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...accessibility.attributes.root}
        {...unhandledProps}
        className={classes.root}
      >
        {children}
      </ElementType>
    )
  }
}

HeaderDescription.create = createShorthandFactory({
  Component: HeaderDescription,
  mappedProp: 'children',
})

/**
 * A HeaderDescription provides more detailed information about the Header.
 */
export default withSafeTypeForAs<typeof HeaderDescription, HeaderDescriptionProps, 'p'>(
  HeaderDescription,
)
