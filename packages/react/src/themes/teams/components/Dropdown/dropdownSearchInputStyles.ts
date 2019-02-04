import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { DropdownSearchInputProps } from '../../../../components/Dropdown/DropdownSearchInput'
import { DropdownVariables } from './dropdownVariables'

const dropdownSearchInputStyles: ComponentSlotStylesInput<
  DropdownSearchInputProps,
  DropdownVariables
> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    flexBasis: v.comboboxFlexBasis,
    flexGrow: 1,
  }),

  input: ({ variables: v }): ICSSInJSStyle => ({
    width: '100%',
    backgroundColor: v.backgroundColor,

    ':focus': {
      borderBottomColor: 'transparent',
    },
  }),
}

export default dropdownSearchInputStyles
