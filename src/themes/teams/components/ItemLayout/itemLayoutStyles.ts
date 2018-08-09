import { pxToRem } from '../../../../lib'
import { debugRoot } from '../../../../styles/debugStyles'

const itemLayoutStyles = {
  root: ({ props, variables }) => {
    const { debugLayout, important } = props
    return {
      ...(debugLayout && debugRoot()),
      gridTemplateRows: `minmax(${variables.itemHeight}, max-content)`,
      paddingLeft: variables.itemPaddingLeft,
      paddingRight: variables.itemPaddingRight,

      ...(important && {
        fontWeight: 'bold',
      }),
    }
  },

  media: ({ props }) => {
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

  header: ({ props, variables }) => ({
    lineHeight: variables.headerLineHeight,
  }),

  headerMedia: ({ props, variables }) => ({
    color: variables.headerMediaColor,
    fontSize: variables.headerMediaFontSize,
    lineHeight: variables.headerMediaLineHeight,
  }),

  content: ({ props, variables }) => ({
    color: variables.contentColor,
    fontSize: variables.contentFontSize,
    lineHeight: variables.contentLineHeight,
  }),
  contentMedia: () => ({}),
  endMedia: () => ({}),
}

export default itemLayoutStyles
