import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { ChatItemGutterProps } from 'src/components/Chat/ChatItemGutter'

const chatItemStyles: ComponentSlotStylesInput<ChatItemGutterProps> = {
  root: (): ICSSInJSStyle => ({}),
}

export default chatItemStyles
