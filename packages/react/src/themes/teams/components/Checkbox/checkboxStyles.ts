import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import Checkbox, { CheckboxProps } from '../../../../components/Checkbox/Checkbox'
import { CheckboxVariables } from './checkboxVariables'
import getBorderFocusStyles from '../../getBorderFocusStyles'

const checkboxStyles: ComponentSlotStylesPrepared<
  CheckboxProps & { checked: boolean },
  CheckboxVariables
> = {
  root: ({ props: p, variables: v, theme: t }): ICSSInJSStyle => ({
    position: 'relative',

    display: 'inline-grid',
    // IE11: Gap is done via virtual column as in autoprefixer
    gridTemplateColumns: p.labelPosition === 'start' ? `1fr ${v.gap} auto` : `auto ${v.gap} 1fr`,
    cursor: 'pointer',
    outline: 0,

    color: v.textColor,
    padding: v.rootPadding,
    verticalAlign: 'middle',
    alignItems: 'start',

    ...getBorderFocusStyles({ siteVariables: t.siteVariables, borderRadius: '3px' }),

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
      cursor: 'default',
      pointerEvents: 'none',
      color: v.disabledColor,
    }),
  }),
}

export default checkboxStyles
