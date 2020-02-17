import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { CheckboxToggleIconProps } from '../../../../components/Checkbox/CheckboxToggleIcon'
import { CheckboxVariables } from './checkboxVariables'

const checkboxToggleIconStyles: ComponentSlotStylesPrepared<
  CheckboxToggleIconProps,
  CheckboxVariables
> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    '-ms-grid-row-align': 'center',
    gridColumn: p.labelPosition === 'start' ? 3 : 1,
    boxShadow: 'unset',

    background: v.background,
    borderColor: v.borderColor,
    borderStyle: v.borderStyle,
    borderRadius: v.toggleBorderRadius,
    borderWidth: v.borderWidth,
    color: v.borderColor,
    margin: v.toggleMargin,
    padding: v.togglePadding,
    transition: 'padding .3s ease',
    userSelect: 'none',
    width: v.toggleWidth,
    height: v.toggleHeight,

    [`& svg`]: {
      width: v.toggleIndicatorSize,
      height: v.toggleIndicatorSize,
    },

    ...(p.checked && {
      background: v.checkedBackground,
      borderColor: v.checkedBorderColor,
      color: v.checkedIndicatorColor,
      padding: v.toggleCheckedPadding,
    }),

    ...(p.disabled && {
      color: v.disabledToggleIndicatorColor,
      background: v.disabledBackground,
      borderColor: v.disabledBorderColor,
    }),

    ...(p.disabled &&
      p.checked && {
        color: v.disabledCheckedIndicatorColor,
        background: v.disabledBackgroundChecked,
        borderColor: 'transparent',
      }),
  }),
}

export default checkboxToggleIconStyles
