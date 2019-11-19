import { ComponentSelectorsAndStyles } from '../../../types'
import { MenuVariables } from '../../../teams/components/Menu/menuVariables'
import { MenuItemWrapperProps } from '../../../../components/Menu/MenuItemWrapper'

const menuItemWrapperStyles: ComponentSelectorsAndStyles<
  MenuItemWrapperProps,
  MenuVariables
> = v => ({
  root: [
    [
      { disabled: false },
      {
        ':hover': {
          color: v.colorActive,
        },
      },
    ],
    [
      { disabled: false, active: false, underlined: false },
      {
        ':hover': {
          background: v.backgroundColorFocus,
        },
      },
    ],
    [
      { active: true, underlined: false },
      {
        color: v.colorActive,
        background: v.backgroundColorActive,
      },
    ],
    [
      [{ iconOnly: true, disabled: false }, { vertical: true, disabled: false }],
      {
        ':hover': {
          background: v.backgroundColorFocus,
        },
      },
    ],
    [
      [{ iconOnly: true, isFromKeyboard: true }, { vertical: true, isFromKeyboard: true }],
      {
        color: v.colorActive,
        background: v.backgroundColorFocus,
      },
    ],
    [
      [{ iconOnly: true, active: true }, { vertical: true, active: true }],
      {
        color: v.colorActive,
        background: v.backgroundColorActive,
      },
    ],
    [
      { underlined: true, disabled: false },
      {
        ':hover': {
          color: v.color,
        },
      },
    ],
    [{ underlined: true, active: true }, { color: v.color }],
    [
      { underlined: true, isFromKeyboard: true },
      {
        color: v.colorActive,
      },
    ],
    [
      { pointing: true, vertical: true },
      {
        '::before': {
          display: 'none',
        },
      },
    ],
    [{ disabled: true }, { cursor: 'default' }],
  ],
})

export default menuItemWrapperStyles
