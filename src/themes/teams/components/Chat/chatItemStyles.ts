import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { ChatItemVariables } from './chatItemVariables'
import { ChatItemProps } from '../../../../components/Chat/ChatItem'
import { pxToRem } from '../../../../lib'

const chatItemStyles: ComponentSlotStylesInput<ChatItemProps, ChatItemVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    position: 'relative',
    marginTop: v.margin,
    marginBottom: v.margin,
    ...(p.grouped && {
      '& + .ui-chat__item-grouped': {
        marginTop: `-${pxToRem(6)}`,
        '& .ui-chat__item__gutter': {
          display: 'none',
        },
        '& .ui-chat__message__author': {
          display: 'none',
        },
        '& .ui-chat__message__timestamp': {
          display: 'none',
        },
      },
    }),
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
