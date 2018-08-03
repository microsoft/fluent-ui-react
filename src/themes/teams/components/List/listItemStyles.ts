import { pxToRem } from '../../../../lib'
import { debugRoot } from '../../../../styles/debugStyles'
import { ICSSInJSStyle } from '../../../../../types/theme'

const listItemStyles = {
  root: ({ props, variables }): ICSSInJSStyle => {
    const { debugLayout, important, selection } = props
    return {
      ...(debugLayout && debugRoot()),
      gridTemplateRows: `minmax(${variables.itemHeight}, max-content)`,
      paddingLeft: variables.itemPaddingLeft,
      paddingRight: variables.itemPaddingRight,

      ...(important && {
        fontWeight: 'bold',
      }),

      ...(selection && {
        position: 'relative',

        ':hover': {
          background: 'rgba(98, 100, 167, .8)',
          color: '#fff',
          cursor: 'pointer',
        },
      }),
    }
  },

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

  header: ({ props, variables }): ICSSInJSStyle => ({
    lineHeight: variables.headerLineHeight,
  }),

  headerMedia: ({ props, variables }): ICSSInJSStyle => ({
    color: variables.headerMediaColor,
    fontSize: variables.headerMediaFontSize,
    lineHeight: variables.headerMediaLineHeight,
  }),

  content: ({ props, variables }): ICSSInJSStyle => ({
    color: variables.contentColor,
    fontSize: variables.contentFontSize,
    lineHeight: variables.contentLineHeight,
  }),
  contentMedia: (): ICSSInJSStyle => ({}),
}

export default listItemStyles
