import ListItem from '../../../../components/List/ListItem'
import { DropdownMessageLoadingProps } from '../../../../components/Dropdown/DropdownMessageLoading'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'

const dropdownMessageLoadingStyles: ComponentSlotStylesInput<DropdownMessageLoadingProps, any> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    [`&.${ListItem.className}`]: { backgroundColor: v.listItemBackgroundColor },
  }),
}

export default dropdownMessageLoadingStyles
