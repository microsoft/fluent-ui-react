import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { default as ChatMessage, ChatMessageProps } from '../../../../components/Chat/ChatMessage'
import { ChatMessageVariables } from './chatMessageVariables'
import { screenReaderContainerStyles } from '../../../../lib/accessibility/Styles/accessibilityStyles'
import { pxToRem } from '../../../../lib'

const chatMessageActionsClassNameSelector = `& .${ChatMessage.slotClassNames.actions}`

const chatMessageStyles: ComponentSlotStylesInput<ChatMessageProps, ChatMessageVariables> = {
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
      [chatMessageActionsClassNameSelector]: {
        opacity: 1,
      },
    },
    ':hover': {
      [chatMessageActionsClassNameSelector]: {
        opacity: 1,
      },
    },
  }),

  actions: ({ props: p, variables: v }): ICSSInJSStyle => ({
    backgroundColor: v.backgroundColor,
    borderRadius: v.borderRadius,
    boxShadow: v.actionsBoxShadow,
    position: 'absolute',
    top: '-20px',
    right: '5px',
    opacity: 0,
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
