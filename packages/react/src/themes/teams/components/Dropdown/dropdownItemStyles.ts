import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { DropdownVariables } from './dropdownVariables'
import { DropdownItemProps } from '../../../../components/Dropdown/DropdownItem'
import getBorderFocusStyles from '../../getBorderFocusStyles'

const dropdownItemStyles: ComponentSlotStylesInput<DropdownItemProps, DropdownVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => ({
    whiteSpace: 'nowrap',
    backgroundColor: v.listItemBackgroundColor,
    ...(p.active && {
      ...(p.isFromKeyboard &&
        getBorderFocusStyles({ siteVariables, isFromKeyboard: p.isFromKeyboard })[':focus']),
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
