import { ICSSInJSStyle } from '../../../types'
import { pxToRem } from '../../../../lib'

const treeStyles = {
  root: (): ICSSInJSStyle => ({
    display: 'block',
    paddingLeft: `${pxToRem(10)}`,
  }),
}

export default treeStyles
