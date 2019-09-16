import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '../../../types'
import { ChatVariables } from './chatVariables'
import { ChatProps } from '../../../../components/Chat/Chat'
import { pxToRem } from '../../../../lib'

const chatStyles: ComponentSlotStylesPrepared<ChatProps, ChatVariables> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    backgroundColor: v.backgroundColor,
    border: `1px solid ${v.backgroundColor}`,
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    padding: `0 ${pxToRem(10)} 0 ${pxToRem(10)}`,
    margin: 0,
  }),
}

export default chatStyles
