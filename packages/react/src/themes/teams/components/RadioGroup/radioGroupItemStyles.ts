import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import {
  RadioGroupItemProps,
  RadioGroupItemState,
} from '../../../../components/RadioGroup/RadioGroupItem'
import { RadioGroupItemVariables } from './radioGroupItemVariables'
import { pxToRem } from '../../../../lib'

const disabledIconStyles = v => ({
  borderColor: v.colorDisabled,
})

const enabledHoverAndFocusIconStyles = v => ({
  borderColor: v.iconColorBorderChecked,
})

const disabledLabelStyles = v => ({
  color: v.colorDisabled,
})

const enabledHoverAndFocusLabelStyles = v => ({
  color: v.labelColorChecked,
})

const radioStyles: ComponentSlotStylesInput<
  RadioGroupItemProps & RadioGroupItemState,
  RadioGroupItemVariables
> = {
  root: ({ props }): ICSSInJSStyle => ({
    outline: 0,
    display: 'inline-flex',
    alignItems: 'center',
    cursor: props.disabled ? 'default' : 'pointer',
    ...(!props.vertical && {
      display: 'inline-block',
    }),
  }),

  label: ({ props: p, variables: v }): ICSSInJSStyle => ({
    backgroundColor: 'transparent',
    color: p.checked ? v.labelColorChecked : v.labelColorDefault,
    ':hover': {
      ...enabledHoverAndFocusLabelStyles(v),
    },
    ':focus': {
      ...enabledHoverAndFocusLabelStyles(v),
    },
    ...(p.disabled && {
      ...disabledLabelStyles(v),
      ':hover': {
        ...disabledLabelStyles(v),
      },
    }),
  }),

  icon: ({ props: p, variables: v }): ICSSInJSStyle => ({
    boxSizing: 'border-box',
    margin: `0 ${pxToRem(12)} 0 0`,
    backgroundColor: p.checked ? v.iconColorBackgroundChecked : 'transparent',
    height: `${pxToRem(12)}`,
    width: `${pxToRem(12)}`,
    boxShadow: 'none',
    borderStyle: 'solid',
    borderWidth: `${pxToRem(1)}`,
    borderColor: p.checked ? v.iconColorBorderChecked : v.iconColorBorderDefault,
    ':hover': {
      ...enabledHoverAndFocusIconStyles(v),
    },
    ':focus': {
      ...enabledHoverAndFocusIconStyles(v),
    },
    ...(p.disabled && {
      ...disabledIconStyles(v),
      ':hover': {
        ...disabledIconStyles(v),
      },
    }),
    ...(p.isFromKeyboard && {
      borderColor: v.iconColorBorderChecked,
      boxShadow: `0 0 0 ${pxToRem(2)} ${v.iconColorBoxShadowFocus}`,
    }),
  }),
}

export default radioStyles
