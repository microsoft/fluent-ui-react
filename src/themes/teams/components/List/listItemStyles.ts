import { pxToRem } from '../../../../lib'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IListItemProps } from '../../../../components/List/ListItem'

const listItemStyles: IComponentPartStylesInput<IListItemProps, any> = {
  root: ({
    props: { active, selection, important },
    variables: { activeBackgroundColor, activeColor },
  }): ICSSInJSStyle => ({
    ...(selection && {
      position: 'relative',

      ':hover': {
        background: activeBackgroundColor,
        color: activeColor,
        cursor: 'pointer',
      },
    }),
    ...(active && {
      background: activeBackgroundColor,
      color: activeColor,
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
  header: ({ props, variables }): ICSSInJSStyle => ({
    fontSize: variables.headerFontSize,
    lineHeight: variables.headerLineHeight,
    ...(props.active && { color: 'inherit' }),
  }),
  headerMedia: ({ props, variables }): ICSSInJSStyle => ({
    color: props.active ? 'inherit' : variables.headerMediaColor,
    fontSize: variables.headerMediaFontSize,
    lineHeight: variables.headerMediaLineHeight,
  }),
  content: ({ props, variables }) => ({
    color: props.active ? 'inherit' : variables.contentColor,
    fontSize: variables.contentFontSize,
    lineHeight: variables.contentLineHeight,
  }),
}

export default listItemStyles
