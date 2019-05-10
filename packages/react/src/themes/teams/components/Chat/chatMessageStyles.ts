import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import {
  default as ChatMessage,
  ChatMessageProps,
  ChatMessageState,
} from '../../../../components/Chat/ChatMessage'
import { ChatMessageVariables } from './chatMessageVariables'
import { screenReaderContainerStyles } from '../../../../lib/accessibility/Styles/accessibilityStyles'
import { pxToRem } from '../../../../lib'
import getBorderFocusStyles from '../../getBorderFocusStyles'

const chatMessageStyles: ComponentSlotStylesInput<
  ChatMessageProps & ChatMessageState,
  ChatMessageVariables
> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => ({
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

    ...getBorderFocusStyles({ siteVariables, isFromKeyboard: p.isFromKeyboard }),

    ':hover': {
      [`& .${ChatMessage.slotClassNames.actionMenu}`]: {
        opacity: 1,
        width: 'auto',
      },
    },
    ...(p.attached === true && {
      [p.mine ? 'borderTopRightRadius' : 'borderTopLeftRadius']: 0,
      [p.mine ? 'borderBottomRightRadius' : 'borderBottomLeftRadius']: 0,
      paddingTop: pxToRem(5),
      paddingBottom: pxToRem(7),
    }),
    ...(p.attached === 'top' && {
      [p.mine ? 'borderBottomRightRadius' : 'borderBottomLeftRadius']: 0,
    }),
    ...(p.attached === 'bottom' && {
      [p.mine ? 'borderTopRightRadius' : 'borderTopLeftRadius']: 0,
      paddingTop: pxToRem(5),
      paddingBottom: pxToRem(7),
    }),
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
    ...((p.mine || p.attached === 'bottom' || p.attached === true) && screenReaderContainerStyles),
    color: v.authorColor,
    marginRight: v.authorMarginRight,
    marginBottom: v.headerMarginBottom,
    fontWeight: v.authorFontWeight,
  }),

  timestamp: ({ props: p, variables: v }) => ({
    marginBottom: v.headerMarginBottom,
    ...(p.mine && {
      color: v.timestampColorMine,
    }),
    ...((p.attached === 'bottom' || p.attached === true) &&
      !p.reactionGroup &&
      screenReaderContainerStyles),
  }),

  content: ({ props: p, variables: v }): ICSSInJSStyle => ({
    color: v.contentColor,
    display: 'block',
    '& a': {
      outline: 'none',
      color: v.contentColorFocus,
      ':focus': {
        textDecoration: 'underline',
      },
    },
    ...(p.badge &&
      p.badgePosition === 'end' && {
        marginRight: pxToRem(4),
      }),
  }),
  badge: ({ props: p, variables: v }) => {
    const sidePosition = p.badgePosition === 'start' ? 'left' : 'right'
    return {
      backgroundColor: v.hasMention ? v.hasMentionNubbinColor : v.isImportantColor,
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
