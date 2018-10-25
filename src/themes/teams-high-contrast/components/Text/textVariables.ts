export interface TextVariables {
  atMentionMeColor: string
  atMentionOtherColor: string
  disabledColor: string
  errorColor: string
  importantColor: string
  successColor: string
  timestampColor: string
  timestampHoverColor: string
}

export default (siteVariables): TextVariables => {
  return {
    atMentionMeColor: siteVariables.accessibleYellow,
    atMentionOtherColor: siteVariables.accessibleYellow,
    disabledColor: siteVariables.accessibleGreen,
    errorColor: siteVariables.red,
    importantColor: siteVariables.red,
    successColor: siteVariables.green04,
    timestampColor: siteVariables.white,
    timestampHoverColor: siteVariables.white,
  }
}
