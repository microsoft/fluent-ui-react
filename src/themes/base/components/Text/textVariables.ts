import { Partial } from 'types/utils'
import { ColorValues } from '../../../types'

export interface TextVariables {
  colors: ColorValues<string>
  atMentionMeColor: string
  atMentionMeFontWeight: number
  atMentionOtherColor: string
  disabledColor: string
  errorColor: string
  importantColor: string
  importantWeight: number
  successColor: string
  timestampColor: string
  timestampHoverColor: string

  fontSizeExtraSmall: string
  fontLineHeightExtraSmall: number
  fontSizeSmall: string
  fontLineHeightSmall: number
  fontSizeMedium: string
  fontLineHeightMedium: number
  fontSizeLarge: string
  fontLineHeightLarge: number
  fontSizeExtraLarge: string
  fontLineHeightExtraLarge: number

  fontWeightLight: number
  fontWeightSemilight: number
  fontWeightRegular: number
  fontWeightSemibold: number
  fontWeightBold: number
}

export default (siteVariables): Partial<TextVariables> => {
  return {}
}
