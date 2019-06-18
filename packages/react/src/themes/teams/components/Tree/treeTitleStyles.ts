import { ICSSInJSStyle } from '../../../types'
import { pxToRem } from '../../../../lib'
import getBorderFocusStyles from '../../getBorderFocusStyles'

const treeTitleStyles = {
  root: ({ variables, theme: { siteVariables } }): ICSSInJSStyle => ({
    padding: `${pxToRem(1)} 0`,
    cursor: 'pointer',
    color: variables.defaultColor,
    position: 'relative',
    ...getBorderFocusStyles({
      siteVariables,
      isFromKeyboard: true,
    }),
  }),
}

export default treeTitleStyles
