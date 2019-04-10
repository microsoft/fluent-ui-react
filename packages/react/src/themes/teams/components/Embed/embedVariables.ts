export interface EmbedVariables {
  controlColor: string
  width: string
  height: string
  focusBorderColor: string
}

export default (siteVariables): EmbedVariables => ({
  controlColor: siteVariables.bodyBackground,
  width: undefined,
  height: undefined,
  focusBorderColor: siteVariables.colors.primary[500],
})
