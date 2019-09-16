import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '../../../types'

import { ChatGutterProps } from '../../../../components/Chat/ChatGutter'
import { ChatGutterVariables } from './chatGutterVariables'

const chatItemStyles: ComponentSlotStylesPrepared<ChatGutterProps, ChatGutterVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    position: 'absolute',
    marginTop: v.margin,
  }),
}

export default chatItemStyles
