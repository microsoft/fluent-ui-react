import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { ChatItemProps } from 'src/components/Chat/ChatItem'
import { ChatMessageVariables } from './chatMessageVariables'
import { pxToRem } from 'src/lib'

const _10pxAsRem_ = pxToRem(10)
const _14pxAsRem_ = pxToRem(14)

const chatItemStyles: ComponentSlotStylesInput<ChatItemProps, ChatMessageVariables> = {
  root: ({ props: p }): ICSSInJSStyle => ({
    ...(p.gutter && { display: 'flex' }),
    position: 'relative',
    justifyContent: p.mine ? 'flex-end' : 'flex-start',
    marginTop: _14pxAsRem_,
    marginBottom: _14pxAsRem_,
  }),

  gutter: ({ props: p }): ICSSInJSStyle => ({
    flex: 'none',
    display: p.mine ? 'none' : undefined,
    marginTop: _10pxAsRem_,
    marginBottom: _10pxAsRem_,
    marginLeft: p.mine ? _10pxAsRem_ : 0,
    marginRight: p.mine ? 0 : _10pxAsRem_,
  }),

  content: ({ props: p }): ICSSInJSStyle => ({
    ...(p.mine && { float: 'right' }),
  }),
}

export default chatItemStyles
