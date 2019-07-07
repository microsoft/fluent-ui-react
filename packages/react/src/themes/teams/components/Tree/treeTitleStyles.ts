import { ICSSInJSStyle } from '../../../types'
import { pxToRem } from '../../../../lib'
import getBorderFocusStyles from '../../getBorderFocusStyles'
import ItemLayout from 'src/components/ItemLayout/ItemLayout'

const treeTitleStyles = {
  root: ({ variables, theme: { siteVariables } }): ICSSInJSStyle => ({
    padding: `${pxToRem(1)} 0`,
    cursor: 'pointer',
    color: variables.defaultColor,
    position: 'relative',
    ':focus': {
      ...getBorderFocusStyles({
        siteVariables,
        isFromKeyboard: true,
      })[':focus'],
      [`> .${ItemLayout.className}`]: {
        background: siteVariables.colorScheme.brand.backgroundFocus1,
      },
    },
  }),
}

export default treeTitleStyles
