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

    '> *:not(:last-child)': {
      marginRight: v.checkboxGap,
    },
  }),

  checkbox: ({ props: p, variables: v }): ICSSInJSStyle => ({
    borderColor: v.checkboxBorderColor,
    borderStyle: v.checkboxBorderStyle,
    borderRadius: v.checkboxBorderRadius,
    borderWidth: v.checkboxBorderWidth,
    boxShadow: 'unset',
    color: v.checkboxColor,
    margin: v.checkboxMargin,
    padding: v.checkboxPadding,

    ...(p.checked && {
      background: v.checkedCheckboxBackground,
      borderColor: v.checkedCheckboxBorderColor,
      color: v.checkedCheckboxColor,
    }),

    ...(p.disabled && {
      borderColor: v.disabledCheckboxColor,

      ...(p.checked && {
        color: v.disabledCheckboxColor,
        background: v.disabledCheckboxBackground,
      }),
    }),
  }),

  toggle: ({ props: p, variables: v }): ICSSInJSStyle => ({
    background: v.toggleBackground,
    borderColor: v.toggleBorderColor,
    borderStyle: v.toggleBorderStyle,
    borderRadius: v.toggleBorderRadius,
    borderWidth: v.toggleBorderWidth,
    boxShadow: 'unset',
    color: v.toggleColor,
    margin: v.toggleMargin,

    padding: v.togglePadding,
    transition: 'padding .3s ease',

    ...(p.checked && {
      background: v.checkedToggleBackground,
      borderColor: v.checkedToggleBorderColor,
      color: v.checkedToggleColor,
      padding: v.checkedTogglePadding,
    }),

    ...(p.disabled && {
      background: v.disabledToggleBackground,
      borderColor: v.disabledToggleBorderColor,
      color: v.disabledToggleColor,
    }),
  }),
}

export default checkboxStyles
