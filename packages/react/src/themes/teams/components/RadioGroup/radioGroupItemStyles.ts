import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import {
  RadioGroupItemProps,
  RadioGroupItemState,
} from '../../../../components/RadioGroup/RadioGroupItem'
import { RadioGroupItemVariables } from './radioGroupItemVariables'
import { pxToRem } from '../../../../lib'

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
    color: p.checked ? v.colorChecked : v.color,
    ':hover': {
      color: v.colorChecked,
    },
    ':focus': {
      color: v.colorChecked,
    },
    ...(p.disabled && {
      color: v.colorDisabled,
      ':hover': {
        color: v.colorDisabled,
      },
    }),
  }),

  icon: ({ props: p, variables: v }): ICSSInJSStyle => ({
    margin: `0 ${pxToRem(12)} 0 0`,
    backgroundColor: p.checked ? v.colorBackgroundChecked : 'transparent',
    height: `${pxToRem(12)}`,
    width: `${pxToRem(12)}`,
    boxShadow: 'none',
    border: `${pxToRem(1)} solid ${p.checked ? v.colorBorderChecked : v.colorBorder}`,
    ':hover': {
      borderColor: v.colorChecked,
    },
    ':focus': {
      borderColor: v.colorChecked,
    },
    ...(p.disabled && {
      borderColor: v.colorDisabled,
      ':hover': {
        borderColor: v.colorDisabled,
      },
    }),
    ...(p.isFromKeyboard && {
      borderColor: v.colorBorderChecked,
      boxShadow: `0 0 0 ${pxToRem(2)} ${v.colorFocusShadow}`,
    }),
  }),
}

export default radioStyles
