import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import Checkbox, { CheckboxProps, CheckboxState } from '../../../../components/Checkbox/Checkbox'
import { CheckboxVariables } from './checkboxVariables'
import getBorderFocusStyles from '../../getBorderFocusStyles'

const checkboxStyles: ComponentSlotStylesInput<CheckboxProps & CheckboxState, CheckboxVariables> = {
  root: ({ props: p, variables: v, theme: t }): ICSSInJSStyle => ({
    color: v.checkboxTextColor,
    padding: v.rootPadding,

    ...getBorderFocusStyles({
      siteVariables: t.siteVariables,
      isFromKeyboard: p.isFromKeyboard,
      borderRadius: '3px',
    }),

    ':hover': {
      color: v.checkboxTextColorHover,
      [`& .${Checkbox.slotClassNames.indicator}`]: {
        ...(p.checked && {
          background: v.checkboxCheckedBackgroundHover,
        }),
        ...(!p.checked && {
          borderColor: v.checkboxBorderColorHover,
          ...(p.toggle && {
            color: v.checkboxCheckedBackgroundHover,
          }),
        }),
      },
    },

    ...(p.checked && {
      color: v.checkboxCheckedTextColor,
    }),

    ...(p.disabled && {
      pointerEvents: 'none',
      color: v.disabledColor,
    }),
  }),

  checkbox: ({ props: p, variables: v }): ICSSInJSStyle => ({
    background: v.checkboxBackground,
    borderColor: v.checkboxBorderColor,
    borderStyle: v.checkboxBorderStyle,
    borderRadius: v.checkboxBorderRadius,
    borderWidth: v.checkboxBorderWidth,
    color: v.checkboxIndicatorColor,
    margin: v.checkboxMargin,
    padding: v.checkboxPadding,

    ...(p.checked && {
      background: v.checkboxCheckedBackground,
      borderColor: v.checkboxCheckedBorderColor,
      color: v.checkboxCheckedIndicatorColor,
    }),

    ...(p.disabled && {
      background: v.disabledCheckboxBackground,
      borderColor: v.disabledCheckboxBorderColor,

      ...(p.checked && {
        color: v.disabledCheckboxCheckedIndicatorColor,
        background: v.disabledCheckboxBackgroundChecked,
      }),
    }),
  }),

  label: ({ props: p, variables: v }): ICSSInJSStyle => ({
    [p.labelPosition === 'start' ? ':after' : ':before']: {
      content: '" "',
      display: 'inline-block',
      width: v.checkboxGap,
    },
  }),

  toggle: ({ props: p, variables: v }): ICSSInJSStyle => ({
    background: v.checkboxBackground,
    borderColor: v.checkboxBorderColor,
    borderStyle: v.checkboxBorderStyle,
    borderRadius: v.toggleBorderRadius,
    borderWidth: v.checkboxBorderWidth,
    color: v.toggleIndicatorColor,
    margin: v.toggleMargin,

    padding: v.togglePadding,
    transition: 'padding .3s ease',

    ...(p.checked && {
      background: v.checkboxCheckedBackground,
      borderColor: v.checkboxCheckedBorderColor,
      color: v.checkboxCheckedIndicatorColor,
      padding: v.toggleCheckedPadding,
    }),

    ...(p.disabled && {
      background: v.disabledCheckboxBackground,
      borderColor: v.disabledCheckboxBorderColor,
      color: v.disabledToggleIndicatorColor,

      ...(p.checked && {
        color: v.disabledCheckboxCheckedIndicatorColor,
        background: v.disabledCheckboxBackgroundChecked,
      }),
    }),
  }),
}

export default checkboxStyles
