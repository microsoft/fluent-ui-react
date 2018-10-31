import { pxToRem } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { ListItemProps } from '../../../../components/List/ListItem'

const hoverStyle = variables => ({
  background: variables.selectionHoverBackgroundColor,
  color: variables.selectionHoverColor,
  cursor: 'pointer',

  '& .ui-item-layout__header': { color: 'inherit' },
  '& .ui-item-layout__content': { color: 'inherit' },

  // hide the header media and content media on hover
  '& .ui-item-layout__headerMedia': { display: 'none', color: 'inherit' },
  '& .ui-item-layout__contentMedia': { display: 'none', color: 'inherit' },

  // show the end media on hover
  '& .ui-item-layout__endMedia': { display: 'block', color: 'inherit' },
})

const listItemStyles: ComponentSlotStylesInput<ListItemProps, any> = {
  root: ({ props: { selection, important }, variables }): ICSSInJSStyle => ({
    ...(selection && {
      position: 'relative',

      // hide the end media by default
      '& .ui-item-layout__endMedia': { display: 'none' },

      '&:hover': hoverStyle(variables),
      '&:focus': hoverStyle(variables),
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
