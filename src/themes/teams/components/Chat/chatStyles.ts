import { ICSSInJSStyle } from '../../../../../types/theme'
import { IChatVariables } from './chatVariables'

const chatStyles = {
  root: ({ variables: v }: { variables: IChatVariables }): ICSSInJSStyle => ({
    backgroundColor: v.backgroundColor,
    border: `1px solid ${v.backgroundColor}`,
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    padding: v.padding,
    margin: 0,
  }),
}

export default chatStyles
