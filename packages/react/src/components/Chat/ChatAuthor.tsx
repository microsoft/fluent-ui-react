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

export interface ChatAuthorProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility

  /** Controls item's relation to other chat items. */
  attached?: boolean | 'top' | 'bottom'

  /** Indicates whether message belongs to the current user. */
  mine?: boolean
}

class ChatAuthor extends UIComponent<WithAsProp<ChatAuthorProps>> {
  static displayName = 'ChatAuthor'
  static propTypes = {
    ...commonPropTypes.createCommon(),
    attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'bottom'])]),
    mine: PropTypes.bool,
  }
  static defaultProps = {
    as: 'span',
  }

  static create: ShorthandFactory<ChatAuthorProps>
  static className = 'ui-chat__author'

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

ChatAuthor.create = createShorthandFactory({ Component: ChatAuthor, mappedProp: 'content' })

/**
 * TODO
 */
export default withSafeTypeForAs<typeof ChatAuthor, ChatAuthorProps, 'span'>(ChatAuthor)
