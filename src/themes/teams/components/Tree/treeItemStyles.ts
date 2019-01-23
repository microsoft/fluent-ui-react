import { ICSSInJSStyle } from '../../../types'

const treeItemStyles = {
  root: ({ pxToRem }): ICSSInJSStyle => ({
    listStyleType: 'none',
    padding: `0 0 0 ${pxToRem(1)}`,
  }),
}

export default treeItemStyles
