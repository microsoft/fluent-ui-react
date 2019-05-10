import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { DropdownVariables } from './dropdownVariables'
import { DropdownItemProps } from '../../../../components/Dropdown/DropdownItem'

const dropdownItemStyles: ComponentSlotStylesInput<DropdownItemProps, DropdownVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    whiteSpace: 'nowrap',
    backgroundColor: v.listItemBackgroundColor,
    ...(p.active && {
      ...(p.isFromKeyboard && {
        // TODO: define here focus state
        background: 'green',
      }),
      ...(!p.isFromKeyboard && {
        color: v.listItemColorHover,
        backgroundColor: v.listItemBackgroundColorHover,
      }),
    }),
    ...(p.selected && {
      // TODO: define selected state
      backgroundColor: 'blue',
    }),
  }),
}

export default dropdownItemStyles
