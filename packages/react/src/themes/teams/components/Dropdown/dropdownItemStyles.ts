import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { DropdownVariables } from './dropdownVariables'
import { DropdownItemProps } from '../../../../components/Dropdown/DropdownItem'
import getBorderFocusStyles from '../../getBorderFocusStyles'
import { pxToRem } from '../../../../lib'

const dropdownItemStyles: ComponentSlotStylesInput<DropdownItemProps, DropdownVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => ({
    minHeight: pxToRem(28),
    whiteSpace: 'nowrap',
    border: `1px solid transparent`,
    backgroundColor: v.listItemBackgroundColor,
    ...(p.selected && {
      fontWeight: v.listItemSelectedFontWeight,
      color: v.listItemSelectedColor,
    }),
    position: 'relative',
    ...(p.active && {
      ...getBorderFocusStyles({
        siteVariables,
        isFromKeyboard: p.isFromKeyboard,
        borderRadius: 0,
      })[':focus'],
      ...(!p.isFromKeyboard && {
        color: v.listItemColorHover,
        backgroundColor: v.listItemBackgroundColorHover,
      }),
    }),
  }),
}

export default dropdownItemStyles
