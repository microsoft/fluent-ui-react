import { ICSSInJSStyle } from '../../../types'

const treeStyles = {
  root: (): ICSSInJSStyle => ({
    verticalAlign: 'middle',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '.5rem',
  }),
}

export default treeStyles
