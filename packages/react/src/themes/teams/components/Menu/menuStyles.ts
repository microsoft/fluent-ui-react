import { pxToRem } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { MenuProps, MenuState } from '../../../../components/Menu/Menu'
import { MenuVariables } from './menuVariables'
import {
  verticalPillsBottomMargin,
  horizontalPillsRightMargin,
  verticalPointingBottomMargin,
} from './menuItemStyles'

type MenuPropsAndState = MenuProps & MenuState

export default {
  root: ({ props: p, variables: v, theme }): ICSSInJSStyle => {
    const { iconOnly, fluid, pointing, pills, primary, underlined, vertical, submenu } = p
    const colorScheme = theme.siteVariables.colorScheme[p.color]
    // const verticalScheme = v[p.vertical].colorScheme

    console.log(colorScheme)

    return {
      display: 'flex',
      minHeight: pxToRem(24),
      margin: 0,
      padding: 0,
      color: v.color || colorScheme.foregroundUndefined,
      backgroundColor: v.backgroundColor || colorScheme.backgroundUndefined,
      listStyleType: 'none',
      ...(iconOnly && { alignItems: 'center' }),
      ...(vertical && {
        flexDirection: 'column',
        color: v.verticalColor || colorScheme.foregroundUndefined,
        backgroundColor: v.verticalBackgroundColor || theme.siteVariables.colors.white,
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
          border: `${v.borderWidth} solid ${v.borderColor}`,
          ...(primary && {
            border: `${v.borderWidth} solid ${v.borderColor}`,
          }),
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
