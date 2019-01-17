import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { ChatItemVariables } from './chatItemVariables'
import { ChatItemProps } from '../../../../components/Chat/ChatItem'

const chatItemStyles: ComponentSlotStylesInput<ChatItemProps, ChatItemVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    position: 'relative',
    marginTop: v.margin,
    marginBottom: v.margin,
  }),

  gutter: ({ props: p, variables: v }): ICSSInJSStyle => ({
    position: 'absolute',
    marginTop: v.gutterMargin,
    [p.gutterPosition === 'end' ? 'right' : 'left']: 0,
  }),

  message: ({ props: p, variables: v }): ICSSInJSStyle => ({
    position: 'relative',
    marginLeft: v.messageMargin,
    marginRight: v.messageMargin,
  }),
}

export default chatItemStyles
