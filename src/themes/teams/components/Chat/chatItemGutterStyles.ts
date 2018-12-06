import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { ChatItemGutterVariables } from './chatItemGutterVariables'
import { ChatItemGutterProps } from 'src/components/Chat/ChatItemGutter'

const chatItemStyles: ComponentSlotStylesInput<ChatItemGutterProps, ChatItemGutterVariables> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    position: 'absolute',
    marginTop: v.margin,
  }),
}

export default chatItemStyles
