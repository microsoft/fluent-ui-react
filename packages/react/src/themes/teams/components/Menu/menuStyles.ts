import { pxToRem } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { MenuProps, MenuState } from '../../../../components/Menu/Menu'
import { MenuVariables } from './menuVariables'
import {
  verticalPillsBottomMargin,
  horizontalPillsRightMargin,
  verticalPointingBottomMargin,
} from './menuItemStyles'
import { getColorScheme } from '../../colors'

type MenuPropsAndState = MenuProps & MenuState

export default {
  root: ({ props: p, variables: v, theme }): ICSSInJSStyle => {
    const { iconOnly, fluid, pointing, pills, primary, color, underlined, vertical, submenu } = p
    const colorScheme = getColorScheme(v.colorScheme, color, primary)

    return {
      display: 'flex',
      minHeight: pxToRem(24),
      margin: 0,
      padding: 0,
      color: v.color,
      backgroundColor: v.backgroundColor || 'inherit',
      listStyleType: 'none',
      ...(iconOnly && { alignItems: 'center' }),
      ...(vertical && {
        flexDirection: 'column',
        backgroundColor: v.verticalBackgroundColor,
        padding: `${pxToRem(8)} 0`,
        ...(submenu && {
          boxShadow: v.verticalBoxShadow,
        }),
        ...(!fluid && { width: pxToRem(200) }),
        ...(iconOnly && {
          display: 'inline-block',
          width: 'auto',
        }),
      }),
      ...(!pills &&
        !iconOnly &&
        !(pointing && vertical) &&
        !underlined && {
          // primary has hardcoded grey border color
          border: `${v.borderWidth} solid ${
            primary ? v.primaryBorderColor : v.borderColor || colorScheme.border
          }`,
          borderRadius: pxToRem(4),
        }),
      ...(underlined && {
        borderBottom: `${v.underlinedBottomBorderWidth} solid ${v.underlinedBorderColor}`,
      }),
    }
  },
  divider: ({ props: { pointing, vertical, pills } }) => ({
    ...(pointing &&
      vertical && {
        marginBottom: verticalPointingBottomMargin,
      }),
    ...(pills && {
      ...(vertical
        ? { margin: `0 0 ${verticalPillsBottomMargin} 0` }
        : { margin: `0 ${horizontalPillsRightMargin} 0 0` }),
    }),
  }),
} as ComponentSlotStylesInput<MenuPropsAndState, MenuVariables>
