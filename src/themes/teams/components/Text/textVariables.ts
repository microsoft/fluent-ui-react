import { TextVariables } from '../../../base/components/Text/textVariables'

export interface TeamsTextVariables extends TextVariables {
  atMentionMeFontWeight: number
  importantWeight: number
  timestampHoverColor: string
}

export default (siteVariables): Partial<TeamsTextVariables> => ({
  atMentionOtherColor: siteVariables.brand06,
  atMentionMeColor: siteVariables.orange04,
  atMentionMeFontWeight: siteVariables.fontWeightBold,
  disabledColor: siteVariables.gray06,
  errorColor: siteVariables.red,
  importantWeight: siteVariables.fontWeightBold,
  importantColor: siteVariables.red,
  successColor: siteVariables.green04,
  timestampColor: siteVariables.gray04,
  timestampHoverColor: siteVariables.gray02,
})
