import { TextAreaVariables } from './textAreaVariables'
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '../../../types'
import { TextAreaProps } from '../../../../components/TextArea/TextArea'

const textAreaStyles: ComponentSlotStylesPrepared<TextAreaProps, TextAreaVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    margin: v.margin,
    resize: v.resize,
  }),
}

export default textAreaStyles
