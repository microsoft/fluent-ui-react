import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { CheckboxProps, CheckboxState } from '../../../../components/Checkbox/Checkbox'
import { CheckboxVariables } from './checkboxVariables'

const checkboxStyles: ComponentSlotStylesInput<CheckboxProps & CheckboxState, CheckboxVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    alignItems: 'center',
    position: 'relative',

    // CSS Grid is polifilled only with latest inline-style-prefixer
    // @ts-ignore is supported by fallback values plugin
    display: ['inline-grid', '-ms-inline-grid'],
    // IE11: Gap is done via virtual column as in autoprefixer
    '-ms-grid-columns':
      p.labelPosition === 'start' ? `1fr ${v.checkboxGap} auto` : `auto ${v.checkboxGap} 1fr`,
    gridTemplateColumns: p.labelPosition === 'start' ? '1fr auto' : 'auto 1fr',
    gridGap: v.checkboxGap,
    cursor: 'pointer',
    outline: 0,

    padding: v.padding,

    ...(p.disabled && {
      color: v.disabledColor,
      cursor: 'default',
    }),
  }),

  checkbox: ({ props: p, variables: v }): ICSSInJSStyle => ({
    '-ms-grid-column': p.labelPosition === 'start' ? 3 : 1,
    '-ms-grid-row-align': 'center',

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

  label: ({ props: p }): ICSSInJSStyle => ({
    '-ms-grid-column': p.labelPosition === 'start' ? 1 : 3,
    display: 'block', // IE11: should be forced `block`, `inline-block` will be broken
  }),

  toggle: ({ props: p, variables: v }): ICSSInJSStyle => ({
    '-ms-grid-column': p.labelPosition === 'start' ? 3 : 1,
    '-ms-grid-row-align': 'center',

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
