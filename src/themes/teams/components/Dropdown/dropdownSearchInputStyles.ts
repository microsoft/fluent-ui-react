import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { DropdownSearchInputProps } from '../../../../components/Dropdown/DropdownSearchInput'
import { DropdownVariables } from './dropdownVariables'

const dropdownSearchInputStyles: ComponentSlotStylesInput<
  DropdownSearchInputProps,
  DropdownVariables
> = {
  input: ({ variables: { backgroundColor } }): ICSSInJSStyle => ({
    width: '100%',
    backgroundColor,

    ':focus': {
      borderBottomColor: 'transparent',
    },
  }),

  wrapper: ({ variables: { editTextFlexBasis } }): ICSSInJSStyle => ({
    flexBasis: editTextFlexBasis,
    flexGrow: 1,
  }),
}

export default dropdownSearchInputStyles
