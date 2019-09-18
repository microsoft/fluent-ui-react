import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenExist,
  UIComponent,
  commonPropTypes,
  rtlTextContainer,
  applyAccessibilityKeyHandlers,
  ContentComponentProps,
  ShorthandFactory,
  createShorthandFactory,
} from '../../lib'
import { WithAsProp, withSafeTypeForAs } from '../../types'
import { Accessibility } from '../../lib/accessibility/types'
import { UIComponentProps, ChildrenComponentProps } from '../../lib/commonPropInterfaces'

export interface ChatTimestampProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility

  /** Controls item's relation to other chat items. */
  attached?: boolean | 'top' | 'bottom'

  /** Indicates whether message belongs to the current user. */
  mine?: boolean

  /** TODO ??? */
  hasReactionGroup?: boolean
}

class ChatTimestamp extends UIComponent<WithAsProp<ChatTimestampProps>> {
  static displayName = 'ChatTimestamp'
  static propTypes = {
    ...commonPropTypes.createCommon(),
    attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'bottom'])]),
    mine: PropTypes.bool,
    hasReactionGroup: PropTypes.bool,
  }
  static defaultProps = {
    as: 'span',
  }

  static create: ShorthandFactory<ChatTimestampProps>
  static className = 'ui-chat__timestamp'

  renderComponent({ ElementType, classes, accessibility, unhandledProps }) {
    const { children, content } = this.props

    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

ChatTimestamp.create = createShorthandFactory({ Component: ChatTimestamp, mappedProp: 'content' })

/**
 * TODO
 */
export default withSafeTypeForAs<typeof ChatTimestamp, ChatTimestampProps, 'span'>(ChatTimestamp)
