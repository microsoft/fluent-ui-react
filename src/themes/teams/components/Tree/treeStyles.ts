import { ICSSInJSStyle } from '../../../types'

const treeStyles = {
  root: ({ pxToRem }): ICSSInJSStyle => ({
    display: 'block',
    paddingLeft: `${pxToRem(10)}`,
  }),
}

export default treeStyles
