import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { DropdownSearchInputProps } from '../../../../components/Dropdown/DropdownSearchInput'
import { DropdownVariables } from './dropdownVariables'

const dropdownSearchInputStyles: ComponentSlotStylesInput<
  DropdownSearchInputProps,
  DropdownVariables
> = {
  input: ({ variables: { backgroundColor, comboboxPaddingInput } }): ICSSInJSStyle => ({
    width: '100%',
    backgroundColor,
    padding: comboboxPaddingInput,

    ':focus': {
      borderBottomColor: 'transparent',
    },
  }),

  combobox: ({ variables: { comboboxFlexBasis } }): ICSSInJSStyle => ({
    flexBasis: comboboxFlexBasis,
    flexGrow: 1,
  }),
}

export default dropdownSearchInputStyles
