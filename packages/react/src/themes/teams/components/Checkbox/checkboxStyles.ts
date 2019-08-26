import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import Checkbox, { CheckboxProps, CheckboxState } from '../../../../components/Checkbox/Checkbox'
import { CheckboxVariables } from './checkboxVariables'
import getBorderFocusStyles from '../../getBorderFocusStyles'
import { pxToRem } from '../../../../lib'

const checkboxStyles: ComponentSlotStylesInput<CheckboxProps & CheckboxState, CheckboxVariables> = {
  root: ({ props: p, variables: v, theme: t }): ICSSInJSStyle => ({
    color: v.textColor,
    padding: v.rootPadding,
    verticalAlign: 'middle',
    alignItems: 'start',

    ...getBorderFocusStyles({
      siteVariables: t.siteVariables,
      isFromKeyboard: p.isFromKeyboard,
      borderRadius: '3px',
    }),

    ':hover': {
      color: v.textColorHover,

      [`& .${Checkbox.slotClassNames.indicator}`]: {
        ...(p.checked && {
          background: v.checkedBackgroundHover,
        }),

        ...(!p.checked && {
          borderColor: v.borderColorHover,

          ...(p.toggle && {
            color: v.borderColorHover,
          }),
        }),
      },
    },

    ...(p.checked && {
      color: v.checkedTextColor,
    }),

    ...(p.disabled && {
      pointerEvents: 'none',
      color: v.disabledColor,
    }),
  }),

  checkbox: ({ props: p, variables: v }): ICSSInJSStyle => ({
    background: v.background,
    borderColor: v.borderColor,
    borderStyle: v.borderStyle,
    borderRadius: v.borderRadius,
    borderWidth: v.borderWidth,
    color: v.indicatorColor,
    margin: `${pxToRem(2)} ${v.margin} ${v.margin} ${v.margin}`,
    padding: v.padding,

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

  toggle: ({ props: p, variables: v }): ICSSInJSStyle => ({
    background: v.background,
    borderColor: v.borderColor,
    borderStyle: v.borderStyle,
    borderRadius: v.toggleBorderRadius,
    borderWidth: v.borderWidth,
    color: v.borderColor,
    margin: v.toggleMargin,
    padding: v.togglePadding,
    transition: 'padding .3s ease',

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

export default checkboxStyles
