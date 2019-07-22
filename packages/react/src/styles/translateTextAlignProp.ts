import { TextAlignProperty } from 'csstype'
import { TextAlignValue } from '../lib'

const translateTextAlignProp = (textAlignProp: TextAlignValue): TextAlignProperty => {
  switch (textAlignProp) {
    case 'start':
      return 'left'
    case 'end':
      return 'right'
    default:
      return textAlignProp as TextAlignProperty
  }
}

export default translateTextAlignProp
