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
  root: ({ props, variables }): ICSSInJSStyle => {
    const { iconOnly, fluid, pointing, pills, primary, underlined, vertical } = props

    const solidBorder = (color: string) => ({
      border: `${variables.menuBorderWidth} solid ${color}`,
    })

    return {
      display: 'flex',
      minHeight: pxToRem(24),
      margin: 0,
      padding: 0,
      listStyleType: 'none',
      ...(iconOnly && { alignItems: 'center' }),
      ...(vertical && {
        flexDirection: 'column',
        boxShadow: variables.verticalMenuBoxShadow,
        backgroundColor: variables.verticalMenuBackgroundColor,
        padding: `${pxToRem(8)} 0`,
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
          ...solidBorder(variables.borderColor),
          ...(primary && {
            ...solidBorder(variables.primaryBorderColor),
          }),
          borderRadius: pxToRem(4),
        }),
      ...(underlined && {
        borderBottom: `2px solid ${variables.primaryUnderlinedBorderColor}`,
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
