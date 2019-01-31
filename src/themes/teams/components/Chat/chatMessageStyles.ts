import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import {
  default as ChatMessage,
  ChatMessageProps,
  ChatMessageState,
} from '../../../../components/Chat/ChatMessage'
import { ChatMessageVariables } from './chatMessageVariables'
import { screenReaderContainerStyles } from '../../../../lib/accessibility/Styles/accessibilityStyles'
import { pxToRem } from '../../../../lib'

const chatMessageActionsClassNameSelector = `& .${ChatMessage.slotClassNames.actionMenu}`

const chatMessageStyles: ComponentSlotStylesInput<
  ChatMessageProps & ChatMessageState,
  ChatMessageVariables
> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'inline-block',
    paddingLeft: v.padding,
    paddingRight: v.padding,
    paddingTop: pxToRem(8),
    paddingBottom: pxToRem(10),
    borderRadius: v.borderRadius,
    border: v.border,
    color: v.color,
    backgroundColor: p.mine ? v.backgroundColorMine : v.backgroundColor,
    maxWidth: v.width,
    position: 'relative',
    wordBreak: 'break-word',
    wordWrap: 'break-word',
    outline: 0,

    ':focus': {
      ...(p.isFromKeyboard && {
        outline: `.2rem solid ${v.contentFocusOutlineColor}`,
      }),
    },
    ':hover': {
      [chatMessageActionsClassNameSelector]: {
        opacity: 1,
      },
    },
  }),

  actionMenu: ({ props: p, variables: v }): ICSSInJSStyle => ({
    backgroundColor: v.backgroundColor,
    borderRadius: v.borderRadius,
    boxShadow: v.actionsBoxShadow,
    opacity: p.focused ? 1 : 0,
    position: 'absolute',
    right: v.actionsPositionRight,
    top: v.actionsPositionTop,
  }),

  author: ({ props: p, variables: v }): ICSSInJSStyle => ({
    ...(p.mine && screenReaderContainerStyles),
    marginRight: v.authorMarginRight,
    marginBottom: v.headerMarginBottom,
  }),

  timestamp: ({ variables: v }) => ({
    marginBottom: v.headerMarginBottom,
  }),

  content: ({ variables: v }): ICSSInJSStyle => ({
    display: 'block',
    '& a:focus': {
      outline: 'none',
      color: v.contentFocusOutlineColor,
      textDecoration: 'underline',
    },
  }),
}

export default chatMessageStyles
