import { ICSSInJSStyle } from '../../../types'
import getBorderFocusStyles from '../../getBorderFocusStyles'
import MenuButton from '../../../../components/MenuButton/MenuButton'
import Button from '../../../../components/Button/Button'

const splitButtonStyles = {
  button: ({ props: p, variables: v }): ICSSInJSStyle => {
    return {
      border: 0,
      ':focus': {
        ...(p.isFromKeyboard
          ? {
              '::before': { border: 0 },
              '::after': { border: 0 },
            }
          : { ':active': { backgroundColor: v.backgroundColorActive } }),
      },
    }
  },
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const { borderWidth } = siteVariables
    const { ':focus': borderFocusStyles } = getBorderFocusStyles({
      siteVariables,
      isFromKeyboard: p.isFromKeyboard,
    })

    return {
      border: `${borderWidth} solid ${v.borderColor}`,
      borderRadius: v.borderRadius,
      position: 'relative',
      display: 'inline-block',

      [`& .${MenuButton.className} .${Button.className}`]: {
        borderRight: 0,
        borderTop: 0,
        borderBottom: 0,
      },

      ':focus-within': {
        boxShadow: 'none',
        ...(p.isFromKeyboard
          ? {
              [`& .${MenuButton.className} .${Button.className}`]: {
                color: v.colorFocus,
                backgroundColor: v.backgroundColorFocus,
                borderColor: siteVariables.colors.white,
              },

              color: v.colorFocus,
              backgroundColor: v.backgroundColorFocus,
              ...borderFocusStyles,
            }
          : { ':active': { backgroundColor: v.backgroundColorActive } }),
      },
    }
  },
}

export default splitButtonStyles
