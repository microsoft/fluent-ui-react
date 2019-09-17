import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '../../../types'
import { ChatItemVariables } from './chatItemVariables'
import { ChatItemProps } from '../../../../components/Chat/ChatItem'
import { pxToRem } from '../../../../lib'

const chatItemStyles: ComponentSlotStylesPrepared<ChatItemProps, ChatItemVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    position: 'relative',
    ...((!p.attached || p.attached === 'top') && { paddingTop: pxToRem(16) }),
    ...((p.attached === 'bottom' || p.attached === true) && {
      paddingTop: pxToRem(2),
    }),
    paddingBottom: 0,
  }),
}

export default chatItemStyles
