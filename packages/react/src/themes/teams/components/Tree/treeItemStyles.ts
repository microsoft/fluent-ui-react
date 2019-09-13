import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { pxToRem } from '../../../../lib'
import getBorderFocusStyles from '../../getBorderFocusStyles'
import { TreeItemProps } from '../../../../components/Tree/TreeItem'
import TreeTitle from '../../../../components/Tree/TreeTitle'

const treeItemStyles: ComponentSlotStylesInput<TreeItemProps> = {
  root: ({ theme: { siteVariables }, props: p }): ICSSInJSStyle => ({
    listStyleType: 'none',
    padding: `0 0 0 ${pxToRem(1 + (p.level - 1) * 10)}`,
    ...getBorderFocusStyles({ siteVariables })[':focus'],
    ':focus-visible': {
      outline: 0,
      [`> .${TreeTitle.className}`]: {
        position: 'relative',
        ...getBorderFocusStyles({ siteVariables })[':focus-visible'],
      },
    },
  }),
}

export default treeItemStyles
