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

  input: ({ props: p }): ICSSInJSStyle => ({
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 0,
    ...(p.inline && {
      padding: 0,
      lineHeight: 'initial',
    }),
  }),
}

export default dropdownSearchInputStyles
