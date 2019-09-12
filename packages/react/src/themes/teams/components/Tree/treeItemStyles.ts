import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '../../../types'
import { pxToRem } from '../../../../lib'
import getBorderFocusStyles from '../../getBorderFocusStyles'
import { TreeItemProps } from '../../../../components/Tree/TreeItem'
import TreeTitle from '../../../../components/Tree/TreeTitle'

const treeItemStyles: ComponentSlotStylesPrepared<TreeItemProps> = {
  root: ({ theme: { siteVariables }, props: p }): ICSSInJSStyle => ({
    listStyleType: 'none',
    padding: `0 0 0 ${pxToRem(1 + (p.level - 1) * 10)}`,
    ':focus': {
      outline: 0,
      [`> .${TreeTitle.className}`]: {
        position: 'relative',
        ...getBorderFocusStyles({ siteVariables }),
      },
    },
  }),
}

export default treeItemStyles
