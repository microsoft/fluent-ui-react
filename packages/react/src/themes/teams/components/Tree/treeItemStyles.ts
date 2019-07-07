import { ICSSInJSStyle } from '../../../types'
import { pxToRem } from '../../../../lib'
import getBorderFocusStyles from '../../getBorderFocusStyles'
import TreeTitle from '../../../../components/Tree/TreeTitle'
import ItemLayout from 'src/components/ItemLayout/ItemLayout'

const treeItemStyles = {
  root: ({ theme: { siteVariables } }): ICSSInJSStyle => ({
    listStyleType: 'none',
    padding: `0 0 0 ${pxToRem(1)}`,
    ':focus': {
      outline: 0,
      [`> .${TreeTitle.className}`]: {
        // position: 'relative',
        ...getBorderFocusStyles({
          siteVariables,
          isFromKeyboard: true,
        })[':focus'],
        [`> ${ItemLayout.className}`]: {
          background: siteVariables.colorScheme.brand.backgroundFocus1,
        },
      },
    },
  }),
}

export default treeItemStyles
