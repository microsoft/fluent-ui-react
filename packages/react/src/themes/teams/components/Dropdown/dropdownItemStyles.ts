import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { DropdownVariables } from './dropdownVariables'
import { DropdownItemProps, DropdownItem } from '../../../../components/Dropdown/DropdownItem'
import getBorderFocusStyles from '../../getBorderFocusStyles'
import { pxToRem } from '../../../../lib'

const dropdownItemStyles: ComponentSlotStylesInput<DropdownItemProps, DropdownVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => ({
    minHeight: pxToRem(0),
    padding: `${pxToRem(4)} ${pxToRem(11)}`,
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
      ...(p.header && {
        [`& .${DropdownItem.slotClassNames.header}`]: {
          // I had to make DropdownItem export from DropdownItem.tsx
          color: v.listItemColorHover,
        },
      }),
    }),
  }),
  image: (): ICSSInJSStyle => ({
    margin: `${pxToRem(3)} ${pxToRem(12)} ${pxToRem(3)} ${pxToRem(4)}`,
  }),
  header: ({ props: p, variables: v }): ICSSInJSStyle => ({
    fontSize: v.listItemHeaderFontSize,
    // if the item doesn't have content - i.e. it is header only - then it should use the content color
    // or Should the default behavior of handling a generic list be changed, so that the "content" property
    // is populated by default and not the header?
    color: v.listItemContentColor,
    ...(p.content && {
      // if there is content it needs to be "tightened up" to the header
      // this could just as easily rely on the image being present.
      marginBottom: pxToRem(-1),
      color: v.listItemHeaderColor,
    }),
    ...(p.selected && {
      fontWeight: v.listItemSelectedFontWeight,
      color: v.listItemSelectedColor,
    }),
  }),
  content: ({ variables: v }): ICSSInJSStyle => ({
    fontSize: v.listItemContentFontSize,
    color: v.listItemContentColor,
  }),
}

export default dropdownItemStyles
