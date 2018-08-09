import { childrenExist, pxToRem } from '../../../../lib'
import {
  IComponentPartStylesInput,
  ICSSInJSStyle,
  ICSSPseudoElementStyle,
} from '../../../../../types/theme'

const dividerBorderStyle = (size, color): ICSSInJSStyle => ({
  height: `${size + 1}px`,
  background: color,
})

const beforeAndAfter = (size, type, variables): ICSSPseudoElementStyle => ({
  content: '""',
  flex: 1,
  ...dividerBorderStyle(size, variables.defaultBackgroundColor), // the default border style
  ...(type === 'primary' && {
    ...dividerBorderStyle(size, variables.typePrimaryBackgroundColor),
  }),
  ...(type === 'secondary' && {
    ...dividerBorderStyle(size, variables.typeSecondaryBackgroundColor),
  }),
})

const dividerStyles: IComponentPartStylesInput = {
  root: ({ props, variables }: { props: any; variables: any }): ICSSInJSStyle => {
    const { children, size, type, important, content } = props
    return {
      marginTop: pxToRem(5 + size * 7.5),
      marginBottom: pxToRem(5 + size * 7.5),
      fontWeight: 400,
      ...(important && {
        fontWeight: 700,
      }),
      ...(childrenExist(children) || content
        ? {
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            lineHeight: 1.25,
            fontSize: pxToRem(12 + size),
            '::before': {
              ...beforeAndAfter(size, type, variables),
              marginRight: pxToRem(22 + size * 2),
            },
            '::after': {
              ...beforeAndAfter(size, type, variables),
              marginLeft: pxToRem(22 + size * 2),
            },
            color: variables.typeSecondaryColor, // the default color
            ...(type === 'primary' && {
              color: variables.typePrimaryColor,
            }),
            ...(type === 'secondary' && {
              color: variables.defaultColor,
            }),
          }
        : {
            ...dividerBorderStyle(size, variables.typeSecondaryBackgroundColor), // the default border style
            ...(type === 'primary' && {
              ...dividerBorderStyle(size, variables.typePrimaryBackgroundColor),
            }),
            ...(type === 'secondary' && {
              ...dividerBorderStyle(size, variables.defaultBackgroundColor),
            }),
          }),
    }
  },
}

export default dividerStyles
