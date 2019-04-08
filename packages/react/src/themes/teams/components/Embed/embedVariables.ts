export interface EmbedVariables {
  controlColor: string
  width: number
  height: number
  focusBorderColor: string
}

export default (siteVariables): EmbedVariables => ({
  controlColor: siteVariables.bodyBackground,
  width: undefined,
  height: undefined,
  focusBorderColor: siteVariables.colors.primary[500],
})
