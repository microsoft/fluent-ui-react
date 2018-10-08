import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IInputBaseProps } from '../../../../components/Input/InputBase'
import { IInputBaseVariables } from './inputBaseVariables'

const inputBaseStyles: IComponentPartStylesInput<IInputBaseProps, IInputBaseVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    outline: 0,
    border: 0,
    borderRadius: v.borderRadius,
    borderBottom: v.borderBottom,
    color: v.fontColor,
    backgroundColor: v.backgroundColor,
    padding: v.inputPadding,
    ...(p.fluid && { width: '100%' }),
    ':focus': {
      borderColor: v.inputFocusBorderColor,
      borderRadius: v.inputFocusBorderRadius,
    },
  }),
}

export default inputBaseStyles
