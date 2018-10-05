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

const beforeAndAfter = (size, primary, variables): ICSSPseudoElementStyle => ({
  content: '""',
  flex: 1,
  ...dividerBorderStyle(size, variables.dividerColor),
  ...(primary && {
    ...dividerBorderStyle(size, variables.primaryColor),
  }),
})

const dividerStyles: IComponentPartStylesInput<IDividerPropsWithDefaults, any> = {
  root: ({ props, variables }): ICSSInJSStyle => {
    const { children, size, primary, important, content } = props
    return {
      color: variables.textColor,
      display: 'flex',
      alignItems: 'center',
      paddingTop: pxToRem(variables.dividerPadding),
      paddingBottom: pxToRem(variables.dividerPadding),
      ...(primary && {
        color: variables.primaryColor,
        fontWeight: variables.importantFontWeight,
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
              ...beforeAndAfter(size, primary, variables),
              marginRight: pxToRem(20),
            },
            '::after': {
              ...beforeAndAfter(size, primary, variables),
              marginLeft: pxToRem(20),
            },
          }
        : {
            '::before': {
              ...beforeAndAfter(size, primary, variables),
            },
          }),
    }
  },
}

export default dividerStyles
