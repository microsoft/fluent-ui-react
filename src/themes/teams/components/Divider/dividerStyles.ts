import { childrenExist, pxToRem } from '../../../../lib'
import {
  IComponentPartStylesInput,
  ICSSInJSStyle,
  ICSSPseudoElementStyle,
} from '../../../../../types/theme'
import { IDividerPropsWithDefaults } from '../../../../components/Divider/Divider'

const dividerBorderStyle = (size, color): ICSSInJSStyle => ({
  height: `${size + 1}px`,
  background: color,
})

const beforeAndAfter = (size, type, variables): ICSSPseudoElementStyle => ({
  content: '""',
  flex: 1,
  ...dividerBorderStyle(size, variables.dividerColor),
  ...(type === 'primary' && {
    ...dividerBorderStyle(size, variables.primaryColor),
  }),
  ...(type === 'secondary' && {
    ...dividerBorderStyle(size, variables.secondaryColor),
  }),
})

const dividerStyles: IComponentPartStylesInput<IDividerPropsWithDefaults, any> = {
  root: ({ props, variables }): ICSSInJSStyle => {
    const { children, size, type, important, content } = props
    return {
      color: variables.textColor,
      display: 'flex',
      alignItems: 'center',
      paddingTop: pxToRem(variables.dividerPadding),
      paddingBottom: pxToRem(variables.dividerPadding),
      ...(type === 'primary' && {
        color: variables.primaryColor,
      }),
      ...(type === 'secondary' && {
        color: variables.secondaryColor,
      }),
      ...(important && {
        fontWeight: variables.importantFontWeight,
      }),
      ...(childrenExist(children) || content
        ? {
            textAlign: 'center',
            fontSize: pxToRem(12 + size),
            lineHeight: variables.textLineHeight,
            '::before': {
              ...beforeAndAfter(size, type, variables),
              marginRight: pxToRem(20),
            },
            '::after': {
              ...beforeAndAfter(size, type, variables),
              marginLeft: pxToRem(20),
            },
          }
        : {
            '::before': {
              ...beforeAndAfter(size, type, variables),
            },
          }),
    }
  },
}

export default dividerStyles
