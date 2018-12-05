import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { ChatItemProps } from '../../../../components/Chat/ChatItem'
import { pxToRem } from '../../../../lib'

const _10pxAsRem_ = pxToRem(10)
const _14pxAsRem_ = pxToRem(14)

const chatItemStyles: ComponentSlotStylesInput<ChatItemProps, any> = {
  root: ({ props: p }): ICSSInJSStyle => ({
    ...(p.gutter && { display: 'flex', justifyContent: p.mine ? 'flex-end' : 'flex-start' }),
    position: 'relative',
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
}

export default chatItemStyles
