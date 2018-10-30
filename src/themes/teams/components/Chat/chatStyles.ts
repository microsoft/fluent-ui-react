import { ICSSInJSStyle } from '../../../types'
import { ChatVariables } from './chatVariables'
import { pxToRem } from '../../../../lib'

const chatStyles = {
  root: ({ variables: v }: { variables: ChatVariables }): ICSSInJSStyle => ({
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
