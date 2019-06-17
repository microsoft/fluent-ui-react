import { ICSSInJSStyle } from '../../../types'
import { pxToRem } from '../../../../lib'
import getBorderFocusStyles from '../../getBorderFocusStyles'
import TreeTitle from '../../../../components/Tree/TreeTitle'

const treeItemStyles = {
  root: ({ theme: { siteVariables } }): ICSSInJSStyle => ({
    listStyleType: 'none',
    padding: `0 0 0 ${pxToRem(1)}`,
    ':focus': {
      outline: 0,
      [`> .${TreeTitle.className}`]: {
        position: 'relative',
        ...getBorderFocusStyles({
          siteVariables,
          isFromKeyboard: true,
        })[':focus'],
      },
    },
  }),
}

export default treeItemStyles
