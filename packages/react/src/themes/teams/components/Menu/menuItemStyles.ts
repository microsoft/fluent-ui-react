import { pxToRem } from '../../../../lib'
import { ICSSInJSStyle, ComponentSelectorsAndStyles } from '../../../types'
import { MenuVariables } from './menuVariables'
import MenuItem, { MenuItemProps } from '../../../../components/Menu/MenuItem'
import getIconFillOrOutlineStyles from '../../getIconFillOrOutlineStyles'

export const underlinedItem = (color: string): ICSSInJSStyle => ({
  paddingBottom: 0,
  borderBottom: `solid ${pxToRem(4)} ${color}`,
  transition: 'color .1s ease',
})

const menuItemStyles: ComponentSelectorsAndStyles<MenuItemProps, MenuVariables> = v => ({
  root: [
    [
      null,
      {
        color: 'inherit',
        display: 'block',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        ':focus': {
          outline: 0,
        },
        ':hover': {
          color: 'inherit',
        },
        [`& .${MenuItem.slotClassNames.indicator}`]: {
          position: 'relative',
          float: 'right',
          left: pxToRem(12),
          userSelect: 'none',
          marginRight: pxToRem(4),
        },
        [`& .${MenuItem.slotClassNames.submenu}`]: { zIndex: 1000 },
        [`& .${MenuItem.slotClassNames.content}`]: {
          whiteSpace: 'normal',
          lineHeight: 1.5,
          marginTop: pxToRem(-4),
          marginBottom: pxToRem(-4),
          display: 'inline-block',
        },
      },
    ],
    [
      { iconOnly: false },
      {
        [`& .${MenuItem.slotClassNames.icon}`]: {
          // reduce margins so text has the dominant influence on the vertical height
          marginTop: 0,
          marginBottom: pxToRem(-8),
          verticalAlign: 'top',
        },
      },
    ],
    [
      { inSubmenu: true },
      {
        [`& .${MenuItem.slotClassNames.indicator}`]: {
          position: 'absolute',
          top: pxToRem(6),
          right: pxToRem(2),
          left: 'unset',
        },
      },
    ],
    [
      [{ inSubmenu: true }, { vertical: true }],
      {
        [`& .${MenuItem.slotClassNames.content}`]: {
          width: 'max-content',
          marginRight: pxToRem(16),
        },
      },
    ],
    [
      [{ inSubmenu: true, icon: true, menu: true }, { vertical: true, icon: true, menu: true }],
      {
        [`& .${MenuItem.slotClassNames.content}`]: {
          minWidth: pxToRem(46 - 26 - 16),
          maxWidth: pxToRem(262 - 26 - 16),
        },
      },
    ],
    [
      [{ inSubmenu: true, icon: true, menu: false }, { vertical: true, icon: true, menu: false }],
      {
        [`& .${MenuItem.slotClassNames.content}`]: {
          minWidth: pxToRem(46 - 26),
          maxWidth: pxToRem(262 - 26),
        },
      },
    ],
    [
      [{ inSubmenu: true, icon: false, menu: true }, { vertical: true, icon: false, menu: true }],
      {
        minWidth: pxToRem(46 - 16),
        maxWidth: pxToRem(262 - 16),
      },
    ],
    [
      [{ inSubmenu: true, icon: false, menu: false }, { vertical: true, icon: false, menu: false }],
      {
        [`& .${MenuItem.slotClassNames.content}`]: {
          minWidth: pxToRem(46),
          maxWidth: pxToRem(262),
        },
      },
    ],
    [
      [
        { pointing: 'start', vertical: true },
        { pointing: 'end', vertical: true },
        { pointing: true, vertical: true },
      ],
      {
        border: '1px solid transparent',
      },
    ],
    [
      { iconOnly: true },
      {
        border: `${pxToRem(2)} solid transparent`,
        margin: pxToRem(1),
        padding: pxToRem(5), // padding works this way to get the border to only be 30x30px on focus which is the current design
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    ],
    [
      { iconOnly: true, disabled: false },
      {
        ':hover': {
          ...getIconFillOrOutlineStyles({ outline: false }),
        },
      },
    ],
    [
      { underlined: true },
      {
        padding: `${pxToRem(4)} 0`,
      },
    ],
    [
      [
        { underlined: false, pointing: 'start', vertical: true },
        { underlined: false, pointing: 'end', vertical: true },
        { underlined: false, pointing: true, vertical: true },
      ],
      {
        padding: `${pxToRem(8)} ${pxToRem(18)}`,
      },
    ],
    [
      { underlined: false, pointing: false, vertical: true, iconOnly: false },
      {
        padding: v.verticalItemPadding,
      },
    ],
    [
      { underlined: false, vertical: false, iconOnly: false },
      {
        padding: v.horizontalPadding,
      },
    ],
    [
      { active: true, iconOnly: true },
      {
        color: v.iconOnlyColorActive,
        ...getIconFillOrOutlineStyles({ outline: false }),
      },
    ],
    [
      { active: true, primary: true, underlined: true },
      {
        color: v.colorScheme && v.colorScheme.brand && v.colorScheme.brand.borderActive,
        ...underlinedItem(
          v.borderColorActive ||
            (v.colorScheme && v.colorScheme.brand && v.colorScheme.brand.borderActive),
        ),
      },
    ],
    [
      { active: true, primary: false, underlined: true },
      {
        fontWeight: 700,
        ...underlinedItem(v.colorActive),
      },
    ],
    [
      { primary: true, active: false, underlined: true, disabled: false },
      {
        ':hover': {
          ...underlinedItem(
            v.underlinedBorderColor ||
              (v.colorScheme && v.colorScheme.brand && v.colorScheme.brand.backgroundActive),
          ),
        },
      },
    ],
    [
      { primary: false, active: false, underlined: true, disabled: false },
      {
        ':hover': {
          ...underlinedItem(
            v.backgroundColorActive ||
              (v.colorScheme && v.colorScheme.default && v.colorScheme.default.backgroundActive),
          ),
        },
      },
    ],
    [
      { isFromKeyboard: true, iconOnly: true },
      {
        borderRadius: '50%',
        borderColor: v.iconOnlyColorActive,
        ...getIconFillOrOutlineStyles({ outline: false }),
      },
    ],
    [
      { isFromKeyboard: true, primary: true, iconOnly: true },
      {
        color: 'inherit',
        borderColor:
          v.borderColorActive ||
          (v.colorScheme && v.colorScheme.brand && v.colorScheme.brand.borderActive),
      },
    ],
    [
      { isFromKeyboard: true, primary: true, underlined: true },
      {
        color: 'inherit',
      },
    ],
    [
      { isFromKeyboard: true, primary: true, underlined: true, active: true },
      {
        ...underlinedItem(
          v.colorScheme && v.colorScheme.brand && v.colorScheme.brand.foregroundActive,
        ),
      },
    ],
    [
      { isFromKeyboard: true, primary: false, underlined: true },
      {
        fontWeight: 700,
      },
    ],
    [
      { isFromKeyboard: true, primary: false, underlined: true, active: true },
      {
        ...underlinedItem(v.colorActive),
      },
    ],
    [
      { primary: true, active: false, underlined: true, disabled: false },
      {
        ':hover': {
          ...underlinedItem(
            v.underlinedBorderColor ||
              (v.colorScheme && v.colorScheme.brand && v.colorScheme.brand.backgroundActive),
          ),
        },
      },
    ],
    [
      { primary: false, active: false, underlined: true, disabled: false },
      {
        ':hover': {
          ...underlinedItem(
            v.backgroundColorActive ||
              (v.colorScheme && v.colorScheme.default && v.colorScheme.default.backgroundActive),
          ),
        },
      },
    ],
    [
      { disabled: true },
      {
        cursor: 'default',
      },
    ],
  ],
})

export default menuItemStyles
