export interface ITextVariables {
  importantTextColor: string
  atMentionMeTextColor: string
  atMentionOtherTextColor: string
  disabledTextColor: string
  errorTextColor: string
  successTextColor: string
  timestampTextColor: string
  timestampHoverTextColor: string
}

export default (siteVariables): ITextVariables => {
  return {
    atMentionOtherTextColor: siteVariables.hyperlinkColor,
    atMentionMeTextColor: siteVariables.hyperlinkColor,
    disabledTextColor: siteVariables.disabledColor,
    errorTextColor: siteVariables.red,
    successTextColor: siteVariables.green04,
    timestampTextColor: siteVariables.white,
    timestampHoverTextColor: siteVariables.white,
    importantTextColor: siteVariables.red,
  }
}
