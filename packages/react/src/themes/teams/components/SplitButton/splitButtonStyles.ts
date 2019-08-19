import { ICSSInJSStyle } from '../../../types'
import getBorderFocusStyles from '../../getBorderFocusStyles'
import MenuButton from '../../../../components/MenuButton/MenuButton'
import Button from '../../../../components/Button/Button'

const splitButtonStyles = {
  button: ({ props: p, theme: { siteVariables } }): ICSSInJSStyle => {
    const { ':focus': borderFocusStyles } = getBorderFocusStyles({
      siteVariables: {
        ...siteVariables,
        focusInnerBorderColor: undefined,
        focusOuterBorderColor: undefined,
      },
      isFromKeyboard: p.isFromKeyboard,
    })

    return {
      ':focus': {
        boxShadow: 'none',
        ...borderFocusStyles,
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
      borderRadius: v.borderRadius,
      borderStyle: 'solid',
      borderWidth,
      borderColor: v.borderColor,
      boxShadow: v.boxShadow,
      outline: 0,

      boxSizing: 'border-box',
      display: 'inline-block',

      ':focus-within': {
        boxShadow: 'none',
        [`& .${MenuButton.className} .${Button.className}`]: {
          backgroundColor: 'transparent',
        },
        ...(p.isFromKeyboard
          ? {
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
