import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { DropdownVariables } from './dropdownVariables'
import DropdownItem, { DropdownItemProps } from '../../../../components/Dropdown/DropdownItem'
import getBorderFocusStyles from '../../getBorderFocusStyles'
import { pxToRem } from '../../../../utils'

export type DropdownItemStylesProps = Pick<
  DropdownItemProps,
  'selected' | 'active' | 'isFromKeyboard'
> & {
  hasContent?: boolean
  hasHeader?: boolean
}

const dropdownItemStyles: ComponentSlotStylesPrepared<
  DropdownItemStylesProps,
  DropdownVariables
> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => ({
    display: 'flex',
    alignItems: 'center',
    minHeight: 0,
    padding: `${pxToRem(4)} ${pxToRem(11)}`,
    whiteSpace: 'nowrap',
    border: `${v.listItemFocusBorderWidth} solid transparent`,
    backgroundColor: v.listItemBackgroundColor,
    ...(p.selected && {
      fontWeight: v.listItemSelectedFontWeight,
      color: v.listItemSelectedColor,
    }),
    position: 'relative',
    ...(p.active && {
      ...(p.isFromKeyboard &&
        getBorderFocusStyles({ siteVariables, borderRadius: 0 })[':focus-visible']),
      ...(!p.isFromKeyboard && {
        color: v.listItemColorHover,
        backgroundColor: v.listItemBackgroundColorHover,
        ...(p.hasHeader && {
          [`& .${DropdownItem.slotClassNames.header}`]: {
            color: v.listItemColorHover,
          },
        }),
        ...(p.hasContent && {
          [`& .${DropdownItem.slotClassNames.content}`]: {
            color: v.listItemColorHover,
          },
        }),
      }),
    }),
  }),
  image: ({ props: p }): ICSSInJSStyle => ({
    margin: `${pxToRem(3)} ${pxToRem(12)} ${pxToRem(3)} ${pxToRem(4)}`,
  }),
  header: ({ props: p, variables: v }): ICSSInJSStyle => ({
    flexGrow: 1,
    lineHeight: v.listItemHeaderLineHeight,

    fontSize: v.listItemHeaderFontSize,
    // if the item doesn't have content - i.e. it is header only - then it should use the content color
    color: v.listItemContentColor,
    ...(p.hasContent && {
      // if there is content it needs to be "tightened up" to the header
      marginBottom: pxToRem(-1),
      color: v.listItemHeaderColor,
    }),
    ...(p.selected && {
      fontWeight: v.listItemSelectedFontWeight,
      color: v.listItemSelectedColor,
    }),
  }),
  content: ({ variables: v }): ICSSInJSStyle => ({
    flexGrow: 1,
    lineHeight: v.listItemContentLineHeight,
    fontSize: v.listItemContentFontSize,
    color: v.listItemContentColor,
  }),
  checkableIndicator: ({ variables: v }) => ({
    position: 'relative',
    left: pxToRem(3),
  }),
  endMedia: () => ({
    flexShrink: 0,
    lineHeight: pxToRem(16),
  }),
  main: () => ({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minWidth: 0, // needed for the truncate styles to work
  }),
}

export default dropdownItemStyles
