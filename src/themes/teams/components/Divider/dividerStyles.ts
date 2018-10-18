import { childrenExist } from '../../../../lib'
import { teamsPxToRem } from '../../utils'
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
})

const dividerStyles: IComponentPartStylesInput<IDividerPropsWithDefaults, any> = {
  root: ({ props, variables }): ICSSInJSStyle => {
    const { children, fitted, size, type, important, content } = props
    return {
      color: variables.textColor,
      display: 'flex',
      alignItems: 'center',
      ...(!fitted && {
        paddingTop: variables.dividerPadding,
        paddingBottom: variables.dividerPadding,
      }),
      ...(type === 'primary' && {
        color: variables.primaryColor,
      }),
      ...(important && {
        fontWeight: variables.importantFontWeight,
      }),
      ...(childrenExist(children) || content
        ? {
            textAlign: 'center',
            fontSize: teamsPxToRem(12 + size),
            lineHeight: variables.textLineHeight,
            '::before': {
              ...beforeAndAfter(size, type, variables),
              marginRight: teamsPxToRem(20),
            },
            '::after': {
              ...beforeAndAfter(size, type, variables),
              marginLeft: teamsPxToRem(20),
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
