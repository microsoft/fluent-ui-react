import { pxToRem } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { MenuProps, MenuState } from '../../../../components/Menu/Menu'
import { MenuVariables } from './menuVariables'

type MenuPropsAndState = MenuProps & MenuState

export default {
  root: ({ props, variables }): ICSSInJSStyle => {
    const { iconOnly, fluid, pointing, underlined, vertical, submenu } = props
    return {
      display: 'flex',
      minHeight: pxToRem(24),
      margin: 0,
      padding: 0,
      listStyleType: 'none',

      ...(iconOnly && {
        alignItems: 'center',
      }),

      ...(vertical && {
        flexDirection: 'column',

        ...(!fluid && {
          minWidth: pxToRem(200),
          maxWidth: pxToRem(330),
        }),

        ...(iconOnly && {
          display: 'inline-block',
          width: 'auto',
        }),

        ...(!iconOnly && {
          padding: `${pxToRem(8)} 0`,
        }),
      }),

      ...(!iconOnly &&
        !(pointing && vertical) &&
        !underlined && {
          border: `${pxToRem(1)} solid ${variables.borderColor}`,
          borderRadius: pxToRem(3),
        }),

      ...(submenu && {
        background: variables.backgroundColor,
      }),
    }
  },
} as ComponentSlotStylesInput<MenuPropsAndState, MenuVariables>
