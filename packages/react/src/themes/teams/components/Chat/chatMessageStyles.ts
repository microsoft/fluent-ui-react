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
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'inline-block',
    position: 'relative',

    marginLeft: p.mine ? v.offset : 0,
    marginRight: !p.mine ? v.offset : 0,
    maxWidth: `calc(100% - ${v.offset})`,
    minWidth: v.offset,

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
        width: 'auto',
      },
    },
  }),

  actionMenu: ({ props: p, variables: v }): ICSSInJSStyle => ({
    backgroundColor: v.backgroundColor,
    borderRadius: v.borderRadius,
    boxShadow: v.actionMenuBoxShadow,
    position: 'absolute',
    right: v.actionMenuPositionRight,
    top: v.actionMenuPositionTop,
    overflow: p.focused ? 'visible' : 'hidden',

    // hide and squash actions menu to prevent accidental hovers over its invisible area
    opacity: p.focused ? 1 : 0,
    width: p.focused ? 'auto' : 0,
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

  content: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'block',
    '& a:focus': {
      outline: 'none',
      color: v.contentFocusOutlineColor,
      textDecoration: 'underline',
    },
    ...(p.badge &&
      p.badgePosition === 'end' && {
        marginRight: pxToRem(4),
      }),
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
  reactionGroup: ({ props: p, variables: v }) => ({
    marginLeft: v.reactionGroupMarginLeft,
    ...(p.badge &&
      p.badgePosition === 'end' && {
        marginRight: pxToRem(2),
      }),
    float: 'right',
  }),
}

export default chatMessageStyles
