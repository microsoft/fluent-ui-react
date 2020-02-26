import { Accessibility } from '@fluentui/accessibility'
import {
  getElementType,
  getUnhandledProps,
  useAccessibility,
  useStyles,
  useTelemetry,
} from '@fluentui/react-bindings'
import * as customPropTypes from '@fluentui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as React from 'react'
// @ts-ignore
import { ThemeContext } from 'react-fela'

import {
  WithAsProp,
  ShorthandValue,
  withSafeTypeForAs,
  FluentComponentStaticProps,
  ProviderContextPrepared,
} from '../../types'
import {
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
} from '../../utils'
import Box, { BoxProps } from '../Box/Box'
import { ChatItemContextProvider } from './chatItemContext'

export interface ChatItemSlotClassNames {
  message: string
  gutter: string
}

export interface ChatItemProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>

  /** Controls item's relation to other chat items. */
  attached?: boolean | 'top' | 'bottom'

  /** Chat items can have a gutter. */
  gutter?: ShorthandValue<BoxProps>

  /** Indicates whether the content is positioned at the start or the end. */
  contentPosition?: 'start' | 'end'

  /** Chat items can have a message. */
  message?: ShorthandValue<BoxProps>
}

export type ChatItemStylesProps = Pick<ChatItemProps, 'attached' | 'contentPosition'>

const ChatItem: React.FC<WithAsProp<ChatItemProps>> &
  FluentComponentStaticProps<ChatItemProps> & {
    slotClassNames: ChatItemSlotClassNames
  } = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext)
  const { setStart, setEnd } = useTelemetry(ChatItem.displayName, context.telemetry)
  setStart()

  const {
    accessibility,
    attached,
    children,
    className,
    contentPosition,
    design,
    gutter,
    message,
    styles,
    variables,
  } = props

  const getA11Props = useAccessibility(accessibility, {
    debugName: ChatItem.displayName,
    rtl: context.rtl,
  })
  const { classes, styles: resolvedStyles } = useStyles<ChatItemStylesProps>(ChatItem.displayName, {
    className: ChatItem.className,
    mapPropsToStyles: () => ({
      attached,
      contentPosition,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  })

  const renderContent = () => {
    const gutterElement = Box.create(gutter, {
      defaultProps: () =>
        getA11Props('gutter', {
          className: ChatItem.slotClassNames.gutter,
          styles: resolvedStyles.gutter,
        }),
    })
    const messageElement = Box.create(message, {
      defaultProps: () =>
        getA11Props('message', {
          className: ChatItem.slotClassNames.message,
          styles: resolvedStyles.message,
        }),
    })

    return (
      <ChatItemContextProvider value={{ attached }}>
        {contentPosition === 'start' && gutterElement}
        {messageElement}
        {contentPosition === 'end' && gutterElement}
      </ChatItemContextProvider>
    )
  }

  const ElementType = getElementType(props)
  const unhandledProps = getUnhandledProps(ChatItem.handledProps, props)

  const element = (
    <ElementType
      {...getA11Props('root', {
        className: classes.root,
        ...rtlTextContainer.getAttributes({ forElements: [children] }),
        ...unhandledProps,
      })}
    >
      {childrenExist(children) ? children : renderContent()}
    </ElementType>
  )
  setEnd()

  return element
}

ChatItem.className = 'ui-chat__item'
ChatItem.displayName = 'ChatItem'

ChatItem.slotClassNames = {
  message: `${ChatItem.className}__message`,
  gutter: `${ChatItem.className}__gutter`,
}

ChatItem.defaultProps = {
  as: 'li',
  contentPosition: 'start',
  attached: false,
}
ChatItem.propTypes = {
  ...commonPropTypes.createCommon({ content: false }),
  attached: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<'top' | 'bottom'>(['top', 'bottom']),
  ]),
  gutter: customPropTypes.itemShorthand,
  contentPosition: PropTypes.oneOf(['start', 'end']),
  message: customPropTypes.itemShorthand,
}
ChatItem.handledProps = Object.keys(ChatItem.propTypes) as any

ChatItem.create = createShorthandFactory({ Component: ChatItem, mappedProp: 'message' })

/**
 * A ChatItem is container for single entity in Chat (e.g. message, notification, etc).
 */
export default withSafeTypeForAs<typeof ChatItem, ChatItemProps, 'li'>(ChatItem)
