import { pxToRem } from '../../utils'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { ListItemProps } from '../../../../components/List/ListItem'

const hoverFocusStyle = variables => ({
  background: variables.selectableFocusHoverBackgroundColor,
  color: variables.selectableFocusHoverColor,
  cursor: 'pointer',

  '& .ui-item-layout__header': { color: 'inherit' },
  '& .ui-item-layout__content': { color: 'inherit' },

  // hide the header media and content media on hover
  '& .ui-item-layout__headerMedia': { display: 'none', color: 'inherit' },
  '& .ui-item-layout__contentMedia': { display: 'none', color: 'inherit' },

  // show the end media on hover
  '& .ui-item-layout__endMedia': { display: 'block', color: 'inherit' },
})

const selectedStyle = variables => ({
  background: variables.selectedBackgroundColor,
  color: variables.selectedColor,
})

const listItemStyles: ComponentSlotStylesInput<ListItemProps, any> = {
  root: ({ props: { selectable, selected, important }, variables }): ICSSInJSStyle => ({
    ...(selectable && {
      position: 'relative',

      // hide the end media by default
      '& .ui-item-layout__endMedia': { display: 'none' },

      '&:hover': hoverFocusStyle(variables),
      '&:focus': hoverFocusStyle(variables),
      ...(selected && selectedStyle(variables)),
    }),
    ...(important && {
      fontWeight: 'bold',
    }),
  }),
  media: ({ props }): ICSSInJSStyle => {
    const { important } = props
    return {
      ...(important && {
        '::before': {
          content: '""',
          position: 'absolute',
          left: pxToRem(8),
          width: pxToRem(2),
          height: pxToRem(2),
          background: '#000',
        },
      }),
    }
  },
  header: ({ variables }): ICSSInJSStyle => ({
    fontSize: variables.headerFontSize,
    lineHeight: variables.headerLineHeight,
  }),
  headerMedia: ({ variables }): ICSSInJSStyle => ({
    fontSize: variables.headerMediaFontSize,
    lineHeight: variables.headerMediaLineHeight,
  }),
  content: ({ variables }) => ({
    fontSize: variables.contentFontSize,
    lineHeight: variables.contentLineHeight,
  }),
}

export default listItemStyles
