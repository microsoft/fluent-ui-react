import { TextVariables } from '../../../base/components/Text/textVariables'

export interface TeamsTextVariables extends TextVariables {
  atMentionMeFontWeight: number
  importantWeight: number
  timestampHoverColor: string
}

export default (siteVariables): Partial<TeamsTextVariables> => {
  return {
    colorScheme: siteVariables.colorScheme,
    atMentionOtherColor: siteVariables.colors.primary[600],
    atMentionMeColor: siteVariables.colors.orange[400],
    atMentionMeFontWeight: siteVariables.fontWeightBold,
    disabledColor: siteVariables.colors.grey[250],
    errorColor: siteVariables.colors.red[400],
    importantWeight: siteVariables.fontWeightBold,
    importantColor: siteVariables.colors.red[400],
    successColor: siteVariables.colors.green[600],
    timestampColor: siteVariables.colors.grey[350],
    timestampHoverColor: siteVariables.colors.grey[500],
  }
}
