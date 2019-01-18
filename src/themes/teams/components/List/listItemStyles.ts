import { pxToRem } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { ListItemProps, ListItemState } from '../../../../components/List/ListItem'

type ListItemPropsAndState = ListItemProps & ListItemState

const selectableHoverStyle = (p: ListItemPropsAndState, v): ICSSInJSStyle => ({
  background: v.selectableFocusHoverBackgroundColor,
  color: v.selectableFocusHoverColor,
  cursor: 'pointer',

  '& .ui-item-layout__header': { color: 'inherit' },
  '& .ui-item-layout__content': { color: 'inherit' },

  // hide the header media and content media on hover
  '& .ui-item-layout__headerMedia': { display: 'none', color: 'inherit' },
  '& .ui-item-layout__contentMedia': { display: 'none', color: 'inherit' },

  // show the end media on hover
  '& .ui-item-layout__endMedia': { display: 'block', color: 'inherit' },
})

const selectableFocusStyle = (p: ListItemPropsAndState, v): ICSSInJSStyle => ({
  ...selectableHoverStyle(p, v),
  outline: 0,

  ...(p.isFromKeyboard && {
    outline: `.2rem solid ${v.selectedFocusOutlineColor}`,
    zIndex: 1,
  }),
})

const selectedStyle = variables => ({
  background: variables.selectedBackgroundColor,
  color: variables.selectedColor,
})

const listItemStyles: ComponentSlotStylesInput<ListItemPropsAndState, any> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    ...(p.selectable && {
      position: 'relative',

      // hide the end media by default
      '& .ui-item-layout__endMedia': { display: 'none' },

      '&:hover': selectableHoverStyle(p, v),
      '&:focus': selectableFocusStyle(p, v),
      ...(p.selected && selectedStyle(v)),
    }),
    ...(p.important && {
      fontWeight: 'bold',
    }),
  }),
  media: ({ props: p }): ICSSInJSStyle => ({
    ...(p.important && {
      '::before': {
        content: '""',
        position: 'absolute',
        left: pxToRem(8),
        width: pxToRem(2),
        height: pxToRem(2),
        background: '#000',
      },
    }),
  }),
  header: ({ variables: v }): ICSSInJSStyle => ({
    fontSize: v.headerFontSize,
    lineHeight: v.headerLineHeight,
  }),
  headerMedia: ({ variables: v }): ICSSInJSStyle => ({
    fontSize: v.headerMediaFontSize,
    lineHeight: v.headerMediaLineHeight,
  }),
  content: ({ variables: v }) => ({
    fontSize: v.contentFontSize,
    lineHeight: v.contentLineHeight,
  }),
}

export default listItemStyles
