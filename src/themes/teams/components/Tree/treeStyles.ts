import { ICSSInJSStyle } from '../../../types'
import { pxToRem } from '../../utils'

const treeStyles = {
  root: (): ICSSInJSStyle => ({
    display: 'block',
    paddingLeft: `${pxToRem(10)}`,
  }),
}

export default treeStyles
