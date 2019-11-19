import { pxToRem } from '../../../../lib'
import { ICSSInJSStyle, ComponentSelectorsAndStyles } from '../../../types'
import { MenuVariables } from './menuVariables'
import { MenuItemWrapperProps } from '../../../../components/Menu/MenuItemWrapper'

export const underlinedItem = (color: string): ICSSInJSStyle => ({
  paddingBottom: 0,
  borderBottom: `solid ${pxToRem(4)} ${color}`,
  transition: 'color .1s ease',
})

const menuItemWrapperStyles: ComponentSelectorsAndStyles<
  MenuItemWrapperProps,
  MenuVariables
> = v => ({
  root: [
    [
      null,
      {
        color: 'inherit',
        lineHeight: 1,
        position: 'relative',
        verticalAlign: 'middle',
        display: 'block',
      },
    ],
    [{ secondary: true }, { background: 'salmon' }],
    [
      { vertical: true },
      {
        border: `solid ${v.verticalItemBorderWidth} ${v.verticalItemBorderColor}`,
      },
    ],
    [{ pills: true }, { borderRadius: pxToRem(5) }],
    [{ pills: true, vertical: true }, { margin: `0 0 ${v.verticalPillsBottomMargin} 0` }],
    [{ pills: true, vertical: false }, { margin: `0 ${v.horizontalPillsRightMargin} 0 0` }],
    [
      { underlined: true },
      {
        display: 'flex',
        alignItems: 'center',
        height: pxToRem(29),
        lineHeight: v.lineHeightBase,
        padding: `0 ${pxToRem(4)}`,
        margin: `0 ${pxToRem(4)} 0 0`,
        ':nth-child(n+2)': {
          marginLeft: `${pxToRem(4)}`,
        },
        boxShadow: 'none',
      },
    ],
    [
      { vertical: false, pills: false, underlined: false, iconOnly: false, primary: true },
      {
        boxShadow: `-1px 0 0 0 ${v.primaryBorderColor ||
          (v.colorScheme && v.colorScheme.brand && v.colorScheme.brand.border)} inset`,
      },
    ],
    [
      { vertical: false, pills: false, underlined: false, iconOnly: false, primary: false },
      {
        boxShadow: `-1px 0 0 0 ${v.borderColor ||
          (v.colorScheme && v.colorScheme.default && v.colorScheme.default.border)} inset`,
      },
    ],
    [
      [{ active: true, underlined: true }, { active: true, iconOnly: true }],
      {
        color: v.color,
      },
    ],
    [
      { active: true, underlined: false, iconOnly: false, primary: true },
      {
        color: v.colorScheme && v.colorScheme.default && v.colorScheme.brand.foregroundActive,
        background:
          v.backgroundColorActive ||
          (v.colorScheme && v.colorScheme.brand && v.colorScheme.brand.backgroundActive),
      },
    ],
    [
      { active: true, underlined: false, iconOnly: false, primary: false },
      {
        color: v.color,
        background:
          v.backgroundColorActive ||
          (v.colorScheme && v.colorScheme.default && v.colorScheme.default.backgroundActive),
      },
    ],
    [
      [
        { active: true, pointing: 'start', vertical: true, isFromKeyboard: false },
        { active: true, pointing: 'end', vertical: true, isFromKeyboard: false },
        { active: true, pointing: true, vertical: true, isFromKeyboard: false },
      ],
      {
        '::before': {
          content: `''`,
          position: 'absolute',
          width: pxToRem(3),
          height: `calc(100% + ${pxToRem(4)})`,
          top: pxToRem(-2),
          backgroundColor: v.pointingIndicatorBackgroundColor,
        },
      },
    ],
    [
      { active: true, vertical: true, isFromKeyboard: false, pointing: 'end' },
      {
        '::before': {
          right: pxToRem(-2),
        },
      },
    ],
    [
      [
        { active: true, vertical: true, isFromKeyboard: false, pointing: 'start' },
        { active: true, vertical: true, isFromKeyboard: false, pointing: true },
      ],
      {
        '::before': {
          left: pxToRem(-2),
        },
      },
    ],
    [
      [
        { active: true, pointing: 'start', vertical: false },
        { active: true, pointing: 'end', vertical: false },
        { active: true, pointing: true, vertical: false },
      ],
      {
        '::after': {
          visibility: 'visible',
          position: 'absolute',
          content: '""',
          left: '50%',
          transform: 'translateX(-50%) translateY(-50%) rotate(45deg)',
          margin: '.5px 0 0',
          width: pxToRem(10),
          height: pxToRem(10),
          border: 'none',
          zIndex: 2,
          transition: 'background .1s ease',
        },
      },
    ],
    [
      [{ active: true, pointing: 'start', vertical: false, primary: true }],
      {
        '::after': {
          top: '-1px',
          background:
            v.backgroundColorActive ||
            (v.colorScheme && v.colorScheme.brand && v.colorScheme.brand.backgroundActive),
          borderTop: `1px solid ${v.borderColor || v.primaryBorderColor}`,
          borderLeft: `1px solid ${v.borderColor || v.primaryBorderColor}`,
        },
      },
    ],
    [
      [
        { active: true, pointing: 'start', vertical: false, primary: false },
        { active: true, pointing: true, vertical: false, primary: false },
      ],
      {
        '::after': {
          top: '-1px',
          background:
            v.backgroundColorActive ||
            (v.colorScheme && v.colorScheme.default && v.colorScheme.default.backgroundActive),
          borderTop: `1px solid ${v.borderColor ||
            (v.colorScheme && v.colorScheme.default && v.colorScheme.default.border)}`,
          borderLeft: `1px solid ${v.borderColor ||
            (v.colorScheme && v.colorScheme.default && v.colorScheme.default.border)}`,
        },
      },
    ],
    [
      { active: true, pointing: 'end', vertical: false, primary: true },
      {
        '::after': {
          top: '100%',
          background:
            v.backgroundColorActive ||
            (v.colorScheme && v.colorScheme.brand && v.colorScheme.brand.backgroundActive),
          borderBottom: `1px solid ${v.borderColor || v.primaryBorderColor}`,
          borderRight: `1px solid ${v.borderColor || v.primaryBorderColor}`,
        },
      },
    ],
    [
      { active: true, pointing: 'end', vertical: false, primary: false },
      {
        '::after': {
          top: '100%',
          background:
            v.backgroundColorActive ||
            (v.colorScheme && v.colorScheme.default && v.colorScheme.default.backgroundActive),
          borderBottom: `1px solid ${v.borderColor ||
            (v.colorScheme && v.colorScheme.default && v.colorScheme.default.border)}`,
          borderRight: `1px solid ${v.borderColor ||
            (v.colorScheme && v.colorScheme.default && v.colorScheme.default.border)}`,
        },
      },
    ],
    [
      { iconOnly: true, disabled: false },
      {
        display: 'flex',
        ':hover': {
          color: v.iconOnlyColorActive,
        },
      },
    ],
    [
      { iconOnly: true, isFromKeyboard: true },
      {
        color: v.iconOnlyColorActive,
      },
    ],
    [
      [
        { iconOnly: false, isFromKeyboard: true, primary: true, active: false },
        { iconOnly: false, isFromKeyboard: true, primary: true, underlined: true },
        { iconOnly: false, isFromKeyboard: true, primary: true, vertical: true },
      ],
      {
        color: v.colorScheme && v.colorScheme.brand && v.colorScheme.brand.foregroundFocus,
        background:
          v.backgroundColorFocus ||
          (v.colorScheme && v.colorScheme.brand && v.colorScheme.brand.backgroundFocus),
      },
    ],
    [
      [
        { iconOnly: false, isFromKeyboard: true, primary: false, active: false },
        { iconOnly: false, isFromKeyboard: true, primary: false, underlined: true },
        { iconOnly: false, isFromKeyboard: true, primary: false, vertical: true },
      ],
      {
        color: v.colorActive,
        background:
          v.backgroundColorFocus ||
          (v.colorScheme && v.colorScheme.default && v.colorScheme.default.backgroundFocus),
      },
    ],
    [
      { iconOnly: false, isFromKeyboard: true, vertical: true, primary: false },
      {
        border: `solid 1px ${v.borderColorFocus}`,
        outline: `solid 1px ${v.outlineColorFocus}`,
        margin: pxToRem(1),
        background:
          v.verticalBackgroundColorFocus ||
          (v.colorScheme && v.colorScheme.default && v.colorScheme.default.backgroundFocus),
      },
    ],
    [
      { iconOnly: false, underlined: true, disabled: false },
      {
        ':hover': {
          color: v.colorActive,
        },
      },
    ],
    [
      { iconOnly: false, underlined: false, primary: true, active: false, disabled: false },
      {
        ':hover': {
          color: v.colorScheme && v.colorScheme.brand && v.colorScheme.brand.foregroundHover,
          background:
            v.backgroundColorHover ||
            (v.colorScheme && v.colorScheme.brand && v.colorScheme.brand.backgroundHover),
        },
      },
    ],
    [
      { iconOnly: false, underlined: false, primary: false, active: false, disabled: false },
      {
        ':hover': {
          color: v.colorScheme && v.colorScheme.default && v.colorScheme.default.foregroundHover,
          background:
            v.backgroundColorHover ||
            (v.colorScheme && v.colorScheme.default && v.colorScheme.default.backgroundHover),
        },
      },
    ],
    [
      { pills: false, iconOnly: false, underlined: false, pointing: false, vertical: true },
      {
        ':first-child': {
          '::before': {
            display: 'none',
          },
        },
      },
    ],
    [
      { pills: false, iconOnly: false, underlined: false, pointing: false, vertical: false },
      {
        ':first-child': {
          borderBottomLeftRadius: pxToRem(3),
          borderTopLeftRadius: pxToRem(3),
        },
      },
    ],
    [
      { disabled: true, primary: false },
      {
        color:
          v.colorDisabled ||
          (v.colorScheme && v.colorScheme.default && v.colorScheme.default.foregroundDisabled),
      },
    ],
    [
      { disabled: true, primary: true },
      {
        color:
          v.colorDisabled ||
          (v.colorScheme && v.colorScheme.brand && v.colorScheme.brand.foregroundDisabled),
      },
    ],
  ],
})

export default menuItemWrapperStyles
