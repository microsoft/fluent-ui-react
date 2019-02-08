import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { DropdownVariables } from './dropdownVariables'
import { DropdownItemProps } from '../../../../components/Dropdown/DropdownItem'

const dropdownItemStyles: ComponentSlotStylesInput<DropdownItemProps, DropdownVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    whiteSpace: 'nowrap',
    backgroundColor: v.listItemBackgroundColor,
    ...(p.active && {
      color: v.listItemColorActive,
      backgroundColor: v.listItemBackgroundColorActive,
    }),
  }),
}

export default dropdownItemStyles
