import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { ChatItemVariables } from './chatItemVariables'
import { ChatItemProps } from '../../../../components/Chat/ChatItem'
import Chat from '../../../../components/Chat/Chat'

const chatItemStyles: ComponentSlotStylesInput<ChatItemProps, ChatItemVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    position: 'relative',
    marginTop: v.margin,
    marginBottom: v.margin,

    [`& .${Chat.Gutter.className}`]: {
      position: 'absolute',
      marginTop: v.gutter.margin,
      [p.gutterPosition === 'end' ? 'right' : 'left']: 0,
    },

    [`& .${Chat.Message.className}`]: {
      position: 'relative',
      marginLeft: v.content.margin,
      marginRight: v.content.margin,
    },
  }),
}

export default chatItemStyles
