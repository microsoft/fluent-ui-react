import { ICSSInJSStyle } from '../../../types'
import getBorderFocusStyles from '../../getBorderFocusStyles'
import SplitButton from '../../../../components/SplitButton/SplitButton'

const splitButtonStyles = {
  menuButton: ({ variables: v }): ICSSInJSStyle => ({
    border: 0,
    padding: v.padding,

    ':focus-visible': {
      '::before': { border: 0 },
      '::after': { border: 0 },
    },
    ':active': { backgroundColor: v.backgroundColorActive },
  }),
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const { borderWidth } = siteVariables
    const borderFocusStyles = getBorderFocusStyles({
      siteVariables,
    })

    return {
      border: `${borderWidth} solid ${v.borderColor}`,
      borderRadius: v.borderRadius,
      position: 'relative',
      display: 'inline-block',

      [`& .${SplitButton.slotClassNames.toggleButton}`]: {
        borderRight: 0,
        borderTop: 0,
        borderBottom: 0,
      },

      ':focus-within': {
        boxShadow: 'none',
        ...(p.isFromKeyboard
          ? {
              [`& .${SplitButton.slotClassNames.toggleButton}`]: {
                color: p.primary ? v.primaryColorFocus : v.colorFocus,
                backgroundColor: p.primary ? v.primaryBackgroundColorFocus : v.backgroundColorFocus,
                borderColor: siteVariables.colors.white,
              },

              color: v.colorFocus,
              backgroundColor: v.backgroundColorFocus,
              ...borderFocusStyles[':focus-visible'],
            }
          : { ':active': { backgroundColor: v.backgroundColorActive } }),
      },
    }
  },
}

export default splitButtonStyles
