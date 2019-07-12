import * as React from 'react'
import * as PropTypes from 'prop-types'
import {
  UIComponent,
  childrenExist,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
} from '../../lib'
import { Accessibility } from '../../lib/accessibility/types'

import { WithAsProp, ShorthandValue, withSafeTypeForAs } from '../../types'
import Box, { BoxProps } from '../Box/Box'

export interface SegmentProps
  extends UIComponentProps<SegmentProps>,
    ChildrenComponentProps,
    ContentComponentProps<ShorthandValue<BoxProps>> {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility

  /** An segment can show it is currently unable to be interacted with. */
  disabled?: boolean

  /** A segment can have its colors inverted for contrast. */
  inverted?: boolean
}

class Segment extends UIComponent<WithAsProp<SegmentProps>, any> {
  static className = 'ui-segment'

  static displayName = 'Segment'

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: 'shorthand',
    }),
    disabled: PropTypes.bool,
    inverted: PropTypes.bool,
    rtlAttributes: PropTypes.func,
  }

  static defaultProps = {
    as: 'div',
  }

  renderComponent({ accessibility, ElementType, classes, unhandledProps }) {
    const { children, content } = this.props

    return (
      <ElementType
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...accessibility.attributes.root}
        {...unhandledProps}
        className={classes.root}
      >
        {childrenExist(children) ? children : Box.create(content)}
      </ElementType>
    )
  }
}

/**
 * A segment is used to create a grouping of related content.
 */
export default withSafeTypeForAs<typeof Segment, SegmentProps>(Segment)
