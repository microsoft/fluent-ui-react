export interface ChatItemVariables {
  margin: string
  gutterMargin: string
  messageMargin: string
}

export default (siteVariables, props, pxToRem): ChatItemVariables => ({
  margin: pxToRem(8),
  gutterMargin: pxToRem(10),
  messageMargin: pxToRem(40),
})
