import { DropdownSelectedItemProps } from '../../../../components/Dropdown/DropdownSelectedItem'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { DropdownVariables } from './dropdownVariables'

const dropdownSelectedItemStyles: ComponentSlotStylesInput<
  DropdownSelectedItemProps,
  DropdownVariables
> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    margin: '.4rem 0 0 .4rem',
    color: v.selectedItemColor,
    ...(v.selectedItemBackgroundColor && {
      backgroundColor: v.selectedItemBackgroundColor,
    }),
    ':focus': {
      color: v.selectedItemColorFocus,
      backgroundColor: v.selectedItemBackgroundColorFocus,
      outline: '0',
    },
    ':hover': {
      color: v.selectedItemColorFocus,
      backgroundColor: v.selectedItemBackgroundColorFocus,
    },
  }),
}

export default dropdownSelectedItemStyles
