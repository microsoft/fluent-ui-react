import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { CheckboxProps, CheckboxState } from '../../../../components/Checkbox/Checkbox'
import { CheckboxVariables } from './checkboxVariables'

const checkboxStyles: ComponentSlotStylesInput<CheckboxProps & CheckboxState, CheckboxVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    alignItems: 'center',
    position: 'relative',

    display: 'inline-flex',
    cursor: 'pointer',
    outline: 0,

    padding: v.padding,

    ...(p.disabled && {
      color: v.disabledColor,
      cursor: 'default',
    }),
  }),

  checkbox: ({ props: p, variables: v }): ICSSInJSStyle => ({
    borderColor: v.borderColor,
    borderStyle: v.borderStyle,
    borderRadius: v.borderRadius,
    borderWidth: v.borderWidth,
    boxShadow: 'unset',
    color: v.checkboxColor,
    margin: v.margin,
    padding: v.padding,

    ...(p.checked && {
      background: v.checkedBackground,
      borderColor: v.checkedBorderColor,
      color: v.checkboxCheckedColor,
    }),

    ...(p.disabled && {
      borderColor: v.disabledCheckboxColor,

      ...(p.checked && {
        color: v.disabledCheckboxColor,
        background: v.disabledBackground,
      }),
    }),
  }),

  label: ({ props: p, variables: v }): ICSSInJSStyle => ({
    [p.labelPosition === 'start' ? ':after' : ':before']: {
      content: '" "',
      display: 'inline-block',
      width: v.gap,
    },
  }),

  toggle: ({ props: p, variables: v }): ICSSInJSStyle => ({
    background: v.checkboxToggleBackground,
    borderColor: v.toggleBorderColor,
    borderStyle: v.toggleBorderStyle,
    borderRadius: v.toggleBorderRadius,
    borderWidth: v.toggleBorderWidth,
    boxShadow: 'unset',
    color: v.toggleIndicatorColor,
    margin: v.toggleMargin,

    padding: v.togglePadding,
    transition: 'padding .3s ease',

    ...(p.checked && {
      background: v.checkboxToggleCheckedBackground,
      borderColor: v.checkboxToggleCheckedBorderColor,
      color: v.checkboxToggleCheckedColor,
      padding: v.toggleCheckedPadding,
    }),

    ...(p.disabled && {
      background: v.disabledcheckboxToggleBackground,
      borderColor: v.disabledToggleBorderColor,
      color: v.disabledToggleIndicatorColor,
    }),
  }),
}

export default checkboxStyles
