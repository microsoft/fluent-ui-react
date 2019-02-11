import { DropdownSelectedItemProps } from '../../../../components/Dropdown/DropdownSelectedItem'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { DropdownVariables } from './dropdownVariables'

const dropdownSelectedItemStyles: ComponentSlotStylesInput<
  DropdownSelectedItemProps,
  DropdownVariables
> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    margin: '.4rem 0 0 .4rem',
    ':focus': {
      backgroundColor: v.selectedItemBackgroundColorFocus,
      outline: '0',
    },
    ':hover': {
      backgroundColor: v.selectedItemBackgroundColorFocus,
    },
  }),
}

export default dropdownSelectedItemStyles
