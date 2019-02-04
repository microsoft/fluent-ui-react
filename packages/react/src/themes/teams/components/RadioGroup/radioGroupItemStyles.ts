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
    ...(!props.vertical && {
      display: 'inline-block',
    }),
  }),

  label: ({ props: p, variables: v }): ICSSInJSStyle => ({
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'baseline',
    fontWeight: 400,
    minHeight: '2.5rem',
    backgroundColor: 'transparent',
    ...(p.disabled && {
      color: v.colorDisabled,
    }),
  }),

  icon: ({ props: p, variables: v }): ICSSInJSStyle => ({
    margin: `0 ${pxToRem(10)} 0 0`,
    color: p.checked ? v.colorChecked : v.color,
    backgroundColor: p.checked ? v.colorBackgroundChecked : v.colorBackground,
    borderColor: p.checked ? v.colorBorderChecked : v.colorBorder,
    outlineColor: v.color,

    ...(p.isFromKeyboard && {
      // this creates both inset and outset box shadow that some readers (NVDA) show when radio is not checked but it is focused
      boxShadow: `0 0 0 ${pxToRem(1)} ${v.color},` + `0 0 0 ${pxToRem(2)} ${v.color} inset`,
    }),
  }),
}

export default radioStyles
