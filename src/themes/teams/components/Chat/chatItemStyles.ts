import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { ChatItemVariables } from './chatItemVariables'
import { ChatItemProps } from '../../../../components/Chat/ChatItem'

const chatItemStyles: ComponentSlotStylesInput<ChatItemProps, ChatItemVariables> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    position: 'relative',
    marginTop: v.margin,
    marginBottom: v.margin,
  }),
}

export default chatItemStyles
