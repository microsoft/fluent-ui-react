import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { CheckboxIconProps } from '../../../../components/Checkbox/CheckboxIcon'
import { CheckboxVariables } from './checkboxVariables'

const checkboxIconStyles: ComponentSlotStylesPrepared<
  CheckboxIconProps & { checked: boolean },
  CheckboxVariables
> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    gridColumn: p.labelPosition === 'start' ? 3 : 1,
    '-ms-grid-row-align': 'center',
    boxShadow: 'unset',

    background: v.background,
    borderColor: v.borderColor,
    borderStyle: v.borderStyle,
    borderRadius: v.borderRadius,
    borderWidth: v.borderWidth,
    color: v.indicatorColor,
    margin: v.margin,
    padding: v.padding,
    userSelect: 'none',

    ...(p.checked && {
      background: v.checkedBackground,
      borderColor: v.checkedBorderColor,
      color: v.checkedIndicatorColor,
    }),

    ...(p.disabled && {
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

export default checkboxIconStyles
