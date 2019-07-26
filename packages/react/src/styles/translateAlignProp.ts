import { TextAlignProperty } from 'csstype'
import { AlignValue } from '../lib'

const translateAlignProp = (textAlignProp: AlignValue): TextAlignProperty => {
  switch (textAlignProp) {
    case 'start':
      return 'left'
    case 'end':
      return 'right'
    default:
      return textAlignProp as TextAlignProperty
  }
}

export default translateAlignProp
