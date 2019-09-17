import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '../../../types'

import { ChatGutterProps } from '../../../../components/Chat/ChatGutter'
import { ChatGutterVariables } from './chatGutterVariables'

const chatGutterStyles: ComponentSlotStylesPrepared<ChatGutterProps, ChatGutterVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    position: 'absolute',
    marginTop: v.margin,

    [p.position === 'end' ? 'right' : 'left']: 0,
    ...((p.attached === 'bottom' || p.attached === true) && {
      display: 'none',
    }),
  }),
}

export default chatGutterStyles
