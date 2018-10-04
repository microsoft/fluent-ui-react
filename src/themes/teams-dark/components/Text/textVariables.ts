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
    atMentionOtherTextColor: siteVariables.brand06,
    atMentionMeTextColor: siteVariables.orange04,
    disabledTextColor: siteVariables.gray06,
    errorTextColor: siteVariables.red,
    successTextColor: siteVariables.green04,
    timestampTextColor: siteVariables.gray04,
    timestampHoverTextColor: siteVariables.gray02,
    importantTextColor: siteVariables.red,
  }
}
