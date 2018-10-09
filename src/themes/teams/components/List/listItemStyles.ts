import { pxToRem } from '../../../../lib'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IListItemProps } from '../../../../components/List/ListItem'

const listItemStyles: IComponentPartStylesInput<IListItemProps, any> = {
  root: ({
    props: { active, selection, important },
    variables: { backgroundColor, fontColor },
  }): ICSSInJSStyle => ({
    ...(selection && {
      position: 'relative',

      ':hover': {
        background: backgroundColor,
        color: fontColor,
        cursor: 'pointer',
      },
    }),
    ...(active && {
      background: backgroundColor,
      color: fontColor,
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
    color: variables.headerMediaColor,
    fontSize: variables.headerMediaFontSize,
    lineHeight: variables.headerMediaLineHeight,
  }),
  content: ({ variables }) => ({
    color: variables.contentColor,
    fontSize: variables.contentFontSize,
    lineHeight: variables.contentLineHeight,
  }),
}

export default listItemStyles
