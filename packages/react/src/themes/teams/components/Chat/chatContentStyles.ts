import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '../../../types'

import { ChatContentProps } from '../../../../components/Chat/ChatContent'
import { ChatContentVariables } from './chatContentVariables'
import { pxToRem } from '@stardust-ui/react'

const chatContentStyles: ComponentSlotStylesPrepared<ChatContentProps, ChatContentVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    color: v.color,
    display: 'block',

    '& a': {
      outline: 'none',
      color: p.mine ? v.mineLinkColor : v.linkColor,
      ':focus': {
        textDecoration: 'underline',
      },
    },

    ...(p.hasBadge &&
      p.badgePosition === 'end' && {
        marginRight: pxToRem(4),
      }),
  }),
}

export default chatContentStyles
