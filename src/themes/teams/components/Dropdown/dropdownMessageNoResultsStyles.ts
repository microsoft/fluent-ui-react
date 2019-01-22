import ListItem from '../../../../components/List/ListItem'
import { DropdownMessageNoResultsProps } from '../../../../components/Dropdown/DropdownMessageNoResults'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'

const dropdownMessageNoResultsStyles: ComponentSlotStylesInput<
  DropdownMessageNoResultsProps,
  any
> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    [`&.${ListItem.className}`]: { backgroundColor: v.listItemBackgroundColor },

    fontWeight: 'bold',
  }),
}

export default dropdownMessageNoResultsStyles
