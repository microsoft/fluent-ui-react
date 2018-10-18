import { IComponentPartStylesInput, ICSSInJSStyle } from 'theme'
import {
  IRadioGroupItemProps,
  IRadioGroupItemState,
} from '../../../../components/RadioGroup/RadioGroupItem'
import { teamsPxToRem } from '../../utils'

const radioStyles: IComponentPartStylesInput<IRadioGroupItemProps & IRadioGroupItemState, any> = {
  root: ({ props }): ICSSInJSStyle => ({
    outline: 0,
    ...(!props.vertical && {
      display: 'inline-block',
    }),
  }),

  label: ({ props, variables }): ICSSInJSStyle => ({
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'baseline',
    fontWeight: variables.fontWeight,
    minHeight: '2.5rem',
    backgroundColor: 'transparent',
    ...(props.disabled && {
      color: variables.disabledColor,
    }),
  }),

  icon: ({ props, variables }): ICSSInJSStyle => ({
    ...(props.isFromKeyboard && {
      // this creates both inset and outset box shadow that some readers (NVDA) show when radio is not checked but it is focused
      boxShadow:
        `0 0 0 ${teamsPxToRem(1)} ${variables.icon.outlineColor},` +
        `0 0 0 ${teamsPxToRem(2)} ${variables.icon.outlineColor} inset`,
    }),
  }),
}

export default radioStyles
