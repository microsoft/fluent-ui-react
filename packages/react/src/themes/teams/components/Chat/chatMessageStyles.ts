import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import {
  default as ChatMessage,
  ChatMessageProps,
  ChatMessageState,
} from '../../../../components/Chat/ChatMessage'
import { ChatMessageVariables } from './chatMessageVariables'
import { screenReaderContainerStyles } from '../../../../lib/accessibility/Styles/accessibilityStyles'
import { pxToRem } from '../../../../lib'

const chatMessageStyles: ComponentSlotStylesInput<
  ChatMessageProps & ChatMessageState,
  ChatMessageVariables
> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const marginOffset = pxToRem(100)

    return {
      display: 'inline-block',
      position: 'relative',

      marginLeft: p.mine ? marginOffset : 0,
      marginRight: !p.mine ? marginOffset : 0,
      maxWidth: `calc(100% - ${marginOffset})`,
      minWidth: marginOffset,

      paddingLeft: v.padding,
      paddingRight: v.padding,
      paddingTop: pxToRem(8),
      paddingBottom: pxToRem(10),

      borderRadius: v.borderRadius,
      border: v.border,
      outline: 0,

      color: v.color,
      backgroundColor: p.mine ? v.backgroundColorMine : v.backgroundColor,

      wordBreak: 'break-word',
      wordWrap: 'break-word',

      ...((v.hasMention || v.isImportant) && {
        '::before': {
          content: '""',
          backgroundColor: v.hasMention ? v.hasMentionColor : v.isImportantColor,
          height: '100%',
          left: '0',
          position: 'absolute',
          top: '0',
          width: pxToRem(3),
          borderBottomLeftRadius: 'inherit',
          borderTopLeftRadius: 'inherit',
        },
      }),

      ':focus': {
        ...(p.isFromKeyboard && {
          outline: `.2rem solid ${v.contentFocusOutlineColor}`,
        }),
      },
      ':hover': {
        [`& .${ChatMessage.slotClassNames.actionMenu}`]: {
          opacity: 1,
        },
      },
    }
  },

  actionMenu: ({ props: p, variables: v }): ICSSInJSStyle => ({
    backgroundColor: v.backgroundColor,
    borderRadius: v.borderRadius,
    boxShadow: v.actionMenuBoxShadow,
    opacity: p.focused ? 1 : 0,
    position: 'absolute',
    right: v.actionMenuPositionRight,
    top: v.actionMenuPositionTop,
  }),

  author: ({ props: p, variables: v }): ICSSInJSStyle => ({
    ...(p.mine && screenReaderContainerStyles),
    marginRight: v.authorMarginRight,
    marginBottom: v.headerMarginBottom,
    fontWeight: v.authorFontWeight,
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
  badge: ({ props: p, variables: v }) => {
    const sidePosition = p.badgePosition === 'start' ? 'left' : 'right'
    return {
      backgroundColor: v.hasMention ? v.hasMentionColor : v.isImportantColor,
      color: v.badgeTextColor,
      boxShadow: v.badgeShadow,
      position: 'absolute',
      padding: pxToRem(4),
      height: 'auto',
      width: 'auto',
      borderRadius: '50%',
      top: pxToRem(4),
      zIndex: '1',
      [sidePosition]: 0,
      transform: p.badgePosition === 'start' ? 'translateX(-50%)' : 'translateX(50%)',
    }
  },
}

export default chatMessageStyles
