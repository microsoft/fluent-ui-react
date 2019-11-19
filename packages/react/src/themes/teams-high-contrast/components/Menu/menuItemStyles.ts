import { ComponentSelectorsAndStyles } from '../../../types'
import { MenuVariables } from '../../../teams/components/Menu/menuVariables'
import { MenuItemProps } from '../../../../components/Menu/MenuItem'
import { underlinedItem } from '../../../teams/components/Menu/menuItemStyles'

const menuItemStyles: ComponentSelectorsAndStyles<MenuItemProps, MenuVariables> = v => ({
  root: [
    [
      { underlined: true },
      {
        ':hover': {
          color: v.color,
        },
      },
    ],
    [
      { underlined: true, active: true },
      {
        color: v.color,
      },
    ],
    [
      { underlined: true, active: true, primary: false },
      {
        ...underlinedItem(v.color),
      },
    ],
    [
      { underlined: true, isFromKeyboard: true },
      {
        color: v.colorActive,
      },
    ],
    [
      { isFromKeyboard: true, iconOnly: true },
      {
        borderColor: 'transparent',
      },
    ],
  ],
})

export default menuItemStyles
