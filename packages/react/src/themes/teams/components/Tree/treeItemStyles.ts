import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { pxToRem } from '../../../../lib'
import getBorderFocusStyles from '../../getBorderFocusStyles'
import { TreeItemProps } from '../../../../components/Tree/TreeItem'
import TreeTitle from '../../../../components/Tree/TreeTitle'

const treeItemStyles: ComponentSlotStylesInput<TreeItemProps> = {
  root: ({ theme: { siteVariables }, props: { level } }): ICSSInJSStyle => ({
    listStyleType: 'none',
    padding: `0 0 0 ${pxToRem(1 + (level - 1) * 10)}`,
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
