import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { ChatMessageProps } from '../../../../components/Chat/ChatMessage'
import { ChatMessageVariables } from './chatMessageVariables'
import { screenReaderContainerStyles } from '../../../../lib/accessibility/Styles/accessibilityStyles'
import { pxToRem } from '../../../../lib'

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
    wordBreak: 'break-word',
    wordWrap: 'break-word',
    outline: 0,
    ...(p.isFromKeyboard && {
      ':focus': {
        outline: `.2rem solid ${v.contentFocusOutlineColor}`,
      },
    }),
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
