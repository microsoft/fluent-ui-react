import { DropdownSelectedItemProps } from '../../../../components/Dropdown/DropdownSelectedItem'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { DropdownVariables } from './dropdownVariables'
import getIconFillOrOutlineStyles from '../../getIconFillOrOutlineStyles'

const dropdownSelectedItemStyles: ComponentSlotStylesInput<
  DropdownSelectedItemProps,
  DropdownVariables
> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    color: v.selectedItemColor,
    background: 'white',
    maxWidth: '280px',
    height: '24px',
    cursor: 'default',
    alignSelf: 'center',
    ...(v.selectedItemBackgroundColor && {
      backgroundColor: v.selectedItemBackgroundColor,
    }),
    ':focus': {
      outline: '0',
    },
  }),
  header: ({ variables: v }) => ({
    marginLeft: '8px',
  }),
  icon: ({ variables: v }) => ({
    cursor: 'pointer',
    padding: '3px',
    ...getIconFillOrOutlineStyles({ outline: true }),
    ':hover': {
      color: v.selectedItemColorFocus,
      ...getIconFillOrOutlineStyles({ outline: false }),
    },
  }),
}

export default dropdownSelectedItemStyles
