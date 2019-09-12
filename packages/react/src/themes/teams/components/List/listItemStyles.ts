import { pxToRem } from '../../../../lib'
import { screenReaderContainerStyles } from '../../../../lib/accessibility/Styles/accessibilityStyles'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { default as ListItem, ListItemProps } from '../../../../components/List/ListItem'

const truncateStyle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

const selectableHoverStyle = (p: ListItemProps, v): ICSSInJSStyle => ({
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

const selectableFocusStyle = (p: ListItemProps, v): ICSSInJSStyle => ({
  ...selectableHoverStyle(p, v),
  outline: 0,

  ':focus-visible': {
    outline: `.2rem solid ${v.selectedFocusOutlineColor}`,
    zIndex: 1,
  },
})

const selectedStyle = variables => ({
  background: variables.selectedBackgroundColor,
  color: variables.selectedColor,
})

const listItemStyles: ComponentSlotStylesInput<ListItemProps, any> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    minHeight: v.minHeight,
    padding: v.rootPadding,
    ...((p.selectable || p.navigable) && {
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
    ...((p.header || p.content) && {
      marginRight: pxToRem(8),
    }),
  }),
  header: ({ props: p, variables: v }) => ({
    fontSize: v.headerFontSize,
    lineHeight: v.headerLineHeight,
    ...(p.truncateHeader && truncateStyle),
    ...((!p.content || p.headerMedia) && {
      marginRight: pxToRem(8),
    }),
  }),
  headerMedia: ({ variables: v }): ICSSInJSStyle => ({
    fontSize: v.headerMediaFontSize,
    lineHeight: v.headerMediaLineHeight,
    alignSelf: 'flex-end',
  }),
  content: ({ props: p, variables: v }) => ({
    fontSize: v.contentFontSize,
    lineHeight: v.contentLineHeight,
    ...(p.truncateContent && truncateStyle),
    ...((!p.header || p.contentMedia) && {
      marginRight: pxToRem(8),
    }),
  }),
  contentMedia: ({ props: p, variables: v }) => ({
    fontSize: v.contentMediaFontSize,
    lineHeight: v.contentMediaLineHeight,
  }),
  endMedia: ({ props: p }) => ({
    ...((p.selectable || p.navigable) && { display: 'none' }),
    flexShrink: 0,
  }),
  main: () => ({
    minWidth: 0, // needed for the truncate styles to work
  }),
}

export default listItemStyles
