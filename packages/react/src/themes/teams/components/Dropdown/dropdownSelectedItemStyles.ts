import { DropdownSelectedItemProps } from '../../../../components/Dropdown/DropdownSelectedItem'
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { DropdownVariables } from './dropdownVariables'
import getIconFillOrOutlineStyles from '../../getIconFillOrOutlineStyles'

const dropdownSelectedItemStyles: ComponentSlotStylesPrepared<
  DropdownSelectedItemProps,
  DropdownVariables
> = {
  root: ({ variables: v, theme: { siteVariables } }): ICSSInJSStyle => ({
    cursor: 'pointer',
    margin: '.4rem 0 0 .4rem',
    color: v.selectedItemColor,
    position: 'relative',
    border: v.selectedItemBorder,
    ...(v.selectedItemBackgroundColor && {
      backgroundColor: v.selectedItemBackgroundColor,
    }),
    ':hover': {
      color: v.selectedItemColorHover,
      backgroundColor: v.selectedItemBackgroundColorHover,
    },
  }),
  icon: ({ variables: v }) => ({
    ...getIconFillOrOutlineStyles({ outline: true }),
    color: v.selectedItemIconColor,
    ':hover': {
      color: v.selectedItemIconColorHover,
      ...getIconFillOrOutlineStyles({ outline: false }),
    },
  }),
}

export default dropdownSelectedItemStyles
