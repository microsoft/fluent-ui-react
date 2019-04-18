import { ComponentStyleFunctionParam, ICSSInJSStyle } from '../../../types'
import { ProviderBoxVariables } from './providerBoxVariables'

export default {
  root: ({
    variables: v,
  }: ComponentStyleFunctionParam<never, ProviderBoxVariables>): ICSSInJSStyle => ({
    '& ::-webkit-scrollbar': {
      height: v.scrollbarHeight,
      width: v.scrollbarWidth,

      ':disabled': {
        display: 'none',
      },
    },
    '& ::-webkit-scrollbar-thumb': {
      borderRadius: v.scrollbarThumbBorderRadius,
      border: `solid ${v.scrollbarThumbBorderSize} transparent`,
      backgroundClip: 'content-box',
      backgroundColor: v.scrollbarThumbBackgroundColor,

      ':hover': {
        backgroundColor: v.scrollbarThumbHoverBackgroundColor,
        border: `solid ${v.scrollbarThumbHoverBorderSize} transparent`,
      },
    },
    '& ::-webkit-scrollbar-track': {
      background: 'transparent',
    },
  }),
}
