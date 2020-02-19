import { Accessibility, chatBehavior, ChatBehaviorProps } from '@fluentui/accessibility'
import {
  getElementType,
  getUnhandledProps,
  useAccessibility,
  useStyles,
  useTelemetry,
} from '@fluentui/react-bindings'
import * as customPropTypes from '@fluentui/react-proptypes'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
// @ts-ignore
import { ThemeContext } from 'react-fela'

import {
  childrenExist,
  ChildrenComponentProps,
  commonPropTypes,
  createShorthandFactory,
  rtlTextContainer,
  UIComponentProps,
} from '../../utils'
import {
  WithAsProp,
  withSafeTypeForAs,
  ShorthandCollection,
  FluentComponentStaticProps,
  ProviderContextPrepared,
} from '../../types'
import ChatItem, { ChatItemProps } from './ChatItem'
import ChatMessage from './ChatMessage'

export interface ChatSlotClassNames {
  item: string
}

export interface ChatProps extends UIComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<ChatBehaviorProps>

  /** Shorthand array of the items inside the chat. */
  items?: ShorthandCollection<ChatItemProps>
}

export type ChatStylesProps = {}

const Chat: React.FC<WithAsProp<ChatProps>> &
  FluentComponentStaticProps<ChatProps> & {
    slotClassNames: ChatSlotClassNames
    Item: typeof ChatItem
    Message: typeof ChatMessage
  } = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext)
  const { setStart, setEnd } = useTelemetry(Chat.displayName, context.telemetry)
  setStart()

  const { accessibility, children, className, design, items, styles, variables } = props

  const getA11Props = useAccessibility(accessibility, {
    debugName: Chat.displayName,
    rtl: context.rtl,
  })
  const { classes } = useStyles<ChatStylesProps>(Chat.displayName, {
    className: Chat.className,
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  })

  const ElementType = getElementType(props)
  const unhandledProps = getUnhandledProps(Chat.handledProps, props)

  const element = getA11Props.unstable_wrapWithFocusZone(
    <ElementType
      {...getA11Props('root', {
        className: classes.root,
        ...rtlTextContainer.getAttributes({ forElements: [children] }),
        ...unhandledProps,
      })}
    >
      {childrenExist(children)
        ? children
        : _.map(items, item =>
            ChatItem.create(item, {
              defaultProps: () => ({ className: Chat.slotClassNames.item }),
            }),
          )}
    </ElementType>,
  )
  setEnd()

  return element
}

Chat.className = 'ui-chat'
Chat.displayName = 'Chat'

Chat.slotClassNames = {
  item: `${Chat.className}__item`,
}

Chat.defaultProps = {
  accessibility: chatBehavior,
  as: 'ul',
}
Chat.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  items: PropTypes.arrayOf(customPropTypes.itemShorthand),
}
Chat.handledProps = Object.keys(Chat.propTypes) as any

Chat.Item = ChatItem
Chat.Message = ChatMessage

Chat.create = createShorthandFactory({ Component: Chat })

/**
 * A Chat displays messages from a conversation between multiple users.
 */
export default withSafeTypeForAs<typeof Chat, ChatProps, 'ul'>(Chat)
