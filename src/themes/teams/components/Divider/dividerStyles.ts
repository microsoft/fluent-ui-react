import { pxToRem } from '../../utils'
import { childrenExist } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle, ICSSPseudoElementStyle } from '../../../types'
import { DividerPropsWithDefaults } from '../../../../components/Divider/Divider'

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

const dividerStyles: ComponentSlotStylesInput<DividerPropsWithDefaults, any> = {
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
