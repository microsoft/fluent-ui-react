import { pxToRem } from '../../../../lib'
import { screenReaderContainerStyles } from '../../../../lib/accessibility/Styles/accessibilityStyles'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import {
  default as ListItem,
  ListItemProps,
  ListItemState,
} from '../../../../components/List/ListItem'

type ListItemPropsAndState = ListItemProps & ListItemState

// const truncateStyle = {
//   overflow: 'hidden',
//   textOverflow: 'ellipsis',
//   whiteSpace: 'nowrap',
// }

const selectableHoverStyle = (p: ListItemPropsAndState, v): ICSSInJSStyle => ({
  background: v.selectableFocusHoverBackgroundColor,
  color: v.selectableFocusHoverColor,
  cursor: 'pointer',

  [`& .${ListItem.slotClassNames.header}`]: { color: 'inherit' },
  [`& .${ListItem.slotClassNames.content}`]: { color: 'inherit' },

  // hide the header media and content media on hover
  [`& .${ListItem.slotClassNames.headerMedia}`]: {
    ...screenReaderContainerStyles,
    color: 'inherit',
  },
  [`& .${ListItem.slotClassNames.contentMedia}`]: { display: 'none', color: 'inherit' },

  // show the end media on hover
  [`& .${ListItem.slotClassNames.endMedia}`]: { display: 'block', color: 'inherit' },
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
    minHeight: v.minHeight,
    ...(p.selectable && {
      position: 'relative',

      // hide the end media by default
      [`& .${ListItem.slotClassNames.endMedia}`]: { display: 'none' },

      '&:hover': selectableHoverStyle(p, v),
      '&:focus': selectableFocusStyle(p, v),
      ...(p.selected && selectedStyle(v)),
    }),
    ...(p.important && {
      fontWeight: 'bold',
    }),
    paddingLeft: v.paddingLeft,
    paddingRight: v.paddingRight,
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
  header: ({ props: p, variables: v }) => ({
    fontSize: v.headerFontSize,
    lineHeight: v.headerLineHeight,
    // ...(p.truncateHeader && truncateStyle),
  }),
  headerMedia: ({ variables: v }): ICSSInJSStyle => ({
    fontSize: v.headerMediaFontSize,
    lineHeight: v.headerMediaLineHeight,
    alignSelf: 'flex-end',
  }),
  content: ({ props: p, variables: v }) => ({
    fontSize: v.contentFontSize,
    lineHeight: v.contentLineHeight,
    // ...(p.truncateContent && truncateStyle),
  }),
  contentMedia: ({ props: p, variables: v }) => ({
    fontSize: v.contentMediaFontSize,
    lineHeight: v.contentMediaLineHeight,
  }),
  endMedia: ({ props: p }) => ({
    ...(p.selectable && { display: 'none' }),
  }),
}

export default listItemStyles
