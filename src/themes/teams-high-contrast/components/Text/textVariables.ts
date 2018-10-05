export interface ITextVariables {
  atMentionMeColor: string
  atMentionOtherColor: string
  disabledColor: string
  errorColor: string
  importantColor: string
  successColor: string
  timestampColor: string
  timestampHoverColor: string
}

export default (siteVariables): ITextVariables => {
  return {
    atMentionMeColor: siteVariables.hyperlinkColor,
    atMentionOtherColor: siteVariables.hyperlinkColor,
    disabledColor: siteVariables.disabledColor,
    errorColor: siteVariables.red,
    importantColor: siteVariables.red,
    successColor: siteVariables.green04,
    timestampColor: siteVariables.white,
    timestampHoverColor: siteVariables.white,
  }
}
