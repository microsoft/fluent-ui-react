import { TextAreaVariables } from './textAreaVariables'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { TextAreaProps } from '../../../../components/TextArea/TextArea'

const textAreaStyles: ComponentSlotStylesInput<TextAreaProps, TextAreaVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    margin: v.margin,
    resize: v.resize,
  }),
}

export default textAreaStyles
