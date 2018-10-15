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
    atMentionMeColor: siteVariables.orange04,
    atMentionOtherColor: siteVariables.brand06,
    disabledColor: siteVariables.gray06,
    errorColor: siteVariables.red,
    importantColor: siteVariables.red,
    successColor: siteVariables.green04,
    timestampColor: siteVariables.gray04,
    timestampHoverColor: siteVariables.gray02,
  }
}
