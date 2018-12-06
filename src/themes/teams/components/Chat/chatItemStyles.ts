import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { ChatItemVariables } from './chatItemVariables'
import { ChatItemProps } from '../../../../components/Chat/ChatItem'

const chatItemStyles: ComponentSlotStylesInput<ChatItemProps, ChatItemVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    position: 'relative',
    marginTop: v.margin,
    marginBottom: v.margin,

    '& .ui-chat__item__gutter': {
      position: 'absolute',
      marginTop: v.gutter.margin,
      [p.mine ? 'right' : 'left']: 0,
    },

    '& .ui-chat__message': {
      position: 'relative',
      marginLeft: v.content.margin,
      marginRight: v.content.margin,
    },
  }),
}

export default chatItemStyles
