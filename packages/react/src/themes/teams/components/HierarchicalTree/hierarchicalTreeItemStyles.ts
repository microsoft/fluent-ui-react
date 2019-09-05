import { ICSSInJSStyle } from '../../../types'
import { pxToRem } from '../../../../lib'
import getBorderFocusStyles from '../../getBorderFocusStyles'
import HierarchicalTreeTitle from '../../../../components/HierarchicalTree/HierarchicalTreeTitle'

const hierarchicalTreeItemStyles = {
  root: ({ theme: { siteVariables } }): ICSSInJSStyle => ({
    listStyleType: 'none',
    padding: `0 0 0 ${pxToRem(1)}`,
    ':focus': {
      outline: 0,
      [`> .${HierarchicalTreeTitle.className}`]: {
        position: 'relative',
        ...getBorderFocusStyles({ siteVariables }),
      },
    },
  }),
}

export default hierarchicalTreeItemStyles
