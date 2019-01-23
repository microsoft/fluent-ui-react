import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { ChatVariables } from './chatVariables'
import { ChatProps } from 'src/components/Chat/Chat'
import { pxToRem } from '../../../../lib'

const chatStyles: ComponentSlotStylesInput<ChatProps, ChatVariables> = {
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
