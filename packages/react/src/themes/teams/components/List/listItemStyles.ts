import { pxToRem } from '../../../../utils'
import { screenReaderContainerStyles } from '../../../../utils/accessibility/Styles/accessibilityStyles'
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { default as ListItem, ListItemProps } from '../../../../components/List/ListItem'
import getBorderFocusStyles from '../../getBorderFocusStyles'
import { ListItemVariables } from './listItemVariables'

export type ListItemStylesProps = Pick<
  ListItemProps,
  | 'debug'
  | 'important'
  | 'navigable'
  | 'selectable'
  | 'selected'
  | 'truncateContent'
  | 'truncateHeader'
> & {
  hasContent?: boolean
  hasContentMedia?: boolean
  hasHeader?: boolean
  hasHeaderMedia?: boolean
}

const truncateStyle: ICSSInJSStyle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

const selectableHoverStyle = (p: ListItemStylesProps, v): ICSSInJSStyle => ({
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

const selectedStyle = variables => ({
  background: variables.selectedBackgroundColor,
  color: variables.selectedColor,
})

const listItemStyles: ComponentSlotStylesPrepared<ListItemStylesProps, ListItemVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const borderFocusStyles = getBorderFocusStyles({
      siteVariables,
    })

    return {
      display: 'flex',
      alignItems: 'center',
      minHeight: v.minHeight,
      padding: v.rootPadding,
      ...((p.selectable || p.navigable) && {
        position: 'relative',

        // hide the end media by default
        [`& .${ListItem.slotClassNames.endMedia}`]: { display: 'none' },

        '&:hover': selectableHoverStyle(p, v),
        ':focus': borderFocusStyles[':focus'],
        ':focus-visible': {
          ...borderFocusStyles[':focus-visible'],
          zIndex: v.zIndex,
        },

        ...(p.selected && selectedStyle(v)),
      }),
      ...(p.important && {
        fontWeight: 'bold',
      }),
    }
  },

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
    ...((p.hasHeader || p.hasContent) && {
      marginRight: pxToRem(8),
    }),
  }),

  header: ({ props: p, variables: v }) => ({
    flexGrow: 1,
    fontSize: v.headerFontSize,
    lineHeight: v.headerLineHeight,

    ...(p.truncateHeader && truncateStyle),
    ...((!p.hasContent || p.hasHeaderMedia) && {
      marginRight: pxToRem(8),
    }),
  }),

  headerMedia: ({ variables: v }): ICSSInJSStyle => ({
    alignSelf: 'flex-end',

    fontSize: v.headerMediaFontSize,
    lineHeight: v.headerMediaLineHeight,
  }),

  content: ({ props: p, variables: v }) => ({
    flexGrow: 1,
    fontSize: v.contentFontSize,
    lineHeight: v.contentLineHeight,

    ...(p.truncateContent && truncateStyle),
    ...((!p.hasHeader || p.hasContentMedia) && {
      marginRight: pxToRem(8),
    }),
  }),

  contentMedia: ({ variables: v }) => ({
    fontSize: v.contentMediaFontSize,
    lineHeight: v.contentMediaLineHeight,
  }),

  endMedia: ({ props: p }) => ({
    flexShrink: 0,
    ...((p.selectable || p.navigable) && { display: 'none' }),
  }),

  headerWrapper: () => ({
    display: 'flex',
  }),

  contentWrapper: () => ({
    display: 'flex',
  }),

  main: () => ({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minWidth: 0, // needed for the truncate styles to work
  }),
}

export default listItemStyles
