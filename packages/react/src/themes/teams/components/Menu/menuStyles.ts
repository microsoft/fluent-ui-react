import { pxToRem } from '../../../../lib'
import { ComponentSelectorsAndStyles } from '../../../types'
import { MenuProps, MenuState } from '../../../../components/Menu/Menu'
import { MenuVariables } from './menuVariables'
import { backportComponentStyle } from '../../../../lib/resolveComponentRules'

type MenuPropsAndState = MenuProps & MenuState & { root?: any; divider?: any }

const menuStyles: ComponentSelectorsAndStyles<MenuPropsAndState, MenuVariables> = v => {
  return {
    root: [
      [
        null,
        {
          // TODO: add for different colors - primary or not primary...
          // const colors = getColorScheme(v.colorScheme, null, primary)
          display: 'flex',
          minHeight: pxToRem(24),
          margin: 0,
          padding: 0,
          color: v.color,
          backgroundColor: v.backgroundColor || 'inherit',
          listStyleType: 'none',
        },
      ],
      [{ iconOnly: true }, { alignItems: 'center' }],
      [
        { vertical: true },
        {
          flexDirection: 'column',
          backgroundColor: v.verticalBackgroundColor,
          padding: `${pxToRem(8)} 0`,
        },
      ],
      [
        { vertical: true, submenu: true },
        {
          boxShadow: v.verticalBoxShadow,
        },
      ],
      [
        { vertical: true, iconOnly: true },
        {
          display: 'inline-block',
          width: 'auto',
        },
      ],
      [{ vertical: true, fluid: false, submenu: false }, { width: 'fit-content' }],
      [
        [
          { pills: false, iconOnly: false, underlined: false, pointing: false, primary: true },
          { pills: false, iconOnly: false, underlined: false, vertical: false, primary: true },
        ],
        {
          border: `${v.borderWidth} solid ${v.primaryBorderColor /* || colors.border */}`,
          borderRadius: pxToRem(4),
        },
      ],
      [
        [
          { pills: false, iconOnly: false, underlined: false, pointing: false, primary: true },
          { pills: false, iconOnly: false, underlined: false, vertical: false, primary: true },
        ],
        {
          // colors.border ?!
          border: `${v.borderWidth} solid ${v.primaryBorderColor /* || colors.border */}`,
          borderRadius: pxToRem(4),
        },
      ],
      [
        [
          { pills: false, iconOnly: false, underlined: false, pointing: false, primary: false },
          { pills: false, iconOnly: false, underlined: false, vertical: false, primary: false },
        ],
        {
          // colors.border ?!
          border: `${v.borderWidth} solid ${v.borderColor /* || colors.border */}`,
          borderRadius: pxToRem(4),
        },
      ],
      [
        { underlined: true },
        {
          borderBottom: `${v.underlinedBottomBorderWidth} solid ${v.underlinedBorderColor}`,
        },
      ],
    ],
    divider: [
      [
        { pointing: true, vertical: true },
        {
          marginBottom: v.verticalPointingBottomMargin,
        },
      ],
      [{ pills: true, vertical: true }, { margin: `0 0 ${v.verticalPillsBottomMargin} 0` }],
      [{ pills: true, vertical: false }, { margin: `0 ${v.horizontalPillsRightMargin} 0 0` }],
    ],
  }
}

export default backportComponentStyle(menuStyles)
