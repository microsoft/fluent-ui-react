import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import {
  RadioGroupItemProps,
  RadioGroupItemState,
} from '../../../../components/RadioGroup/RadioGroupItem'
import { RadioGroupItemVariables } from './radioGroupItemVariables'
import { pxToRem } from '../../../../lib'

const restHoverTextColor = textColor => ({
  color: textColor,

  ':hover': {
    color: textColor,
  },
})

const radioStyles: ComponentSlotStylesInput<
  RadioGroupItemProps & RadioGroupItemState,
  RadioGroupItemVariables
> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    alignItems: 'center',
    color: v.textColorDefault,
    cursor: 'pointer',
    display: p.vertical ? 'flex' : 'inline-flex',
    fontSize: v.textFontSize,
    padding: v.padding,
    margin: v.margin,
    outline: 0,

    ':hover': {
      color: v.textColorDefaultHoverFocus,
    },

    ':focus': {
      color: v.textColorDefaultHoverFocus,
    },

    ...(p.checked && {
      ...restHoverTextColor(v.textColorChecked),
    }),

    ...(p.disabled && {
      ...restHoverTextColor(v.colorDisabled),
    }),
  }),

  icon: ({ props: p, variables: v }): ICSSInJSStyle => ({
    // overrides from icon styles
    backgroundColor: 'transparent',
    boxShadow: 'none',

    // can remove this after global style for border-box goes in
    boxSizing: 'border-box',

    borderStyle: 'solid',
    borderWidth: `${pxToRem(1)}`,
    borderColor: 'currentColor',
    margin: `0 ${pxToRem(12)} 0 0`,
    height: `${pxToRem(12)}`,
    width: `${pxToRem(12)}`,

    ...(p.checked && {
      backgroundColor: v.iconBackgroundColorChecked,
      borderColor: v.iconBorderColorChecked,
    }),

    ...(p.disabled && {
      borderColor: v.colorDisabled,
    }),

    ...(p.checked &&
      p.disabled && {
        backgroundColor: v.colorDisabled,
      }),

    ...(p.isFromKeyboard && {
      borderColor: v.iconBorderColorChecked,
      boxShadow: `0 0 0 ${pxToRem(2)} ${v.iconColorBoxShadowFocus}`,
    }),
  }),
}

export default radioStyles
