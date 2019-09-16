import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '../../../types'
import { ChatItemVariables } from './chatItemVariables'
import { ChatItemProps } from '../../../../components/Chat/ChatItem'
import { pxToRem } from '../../../../lib'
import ChatGutter from '../../../../components/Chat/ChatGutter'
import ChatMessage from '../../../../components/Chat/ChatMessage'

const chatItemStyles: ComponentSlotStylesPrepared<ChatItemProps, ChatItemVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    position: 'relative',
    ...((!p.attached || p.attached === 'top') && { paddingTop: pxToRem(16) }),
    ...((p.attached === 'bottom' || p.attached === true) && {
      paddingTop: pxToRem(2),
    }),
    paddingBottom: 0,

    [`& .${ChatGutter.className}`]: {
      [p.contentPosition === 'end' ? 'right' : 'left']: 0,
      ...((p.attached === 'bottom' || p.attached === true) && {
        display: 'none',
      }),
    },

    [`& .${ChatMessage.className}`]: {
      float: p.contentPosition === 'end' ? 'right' : 'left',
    },
  }),
}

export default chatItemStyles
