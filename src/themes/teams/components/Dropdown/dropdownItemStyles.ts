import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { DropdownVariables } from './dropdownVariables'
import { DropdownItemProps } from '../../../../components/Dropdown/DropdownItem'
import ListItem from '../../../../components/List/ListItem'

const dropdownItemStyles: ComponentSlotStylesInput<DropdownItemProps, DropdownVariables> = {
  root: ({ variables: v, props: { active } }): ICSSInJSStyle => ({
    [`&.${ListItem.className}`]: { backgroundColor: v.listItemBackgroundColor },

    ...(active && {
      [`&.${ListItem.className}`]: {
        backgroundColor: v.listItemBackgroundColorActive,
        color: v.listItemColorActive,
      },
    }),
  }),
}

export default dropdownItemStyles
