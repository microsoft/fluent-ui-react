export interface EmbedVariables {
  width: number
  height: number
  focusBorderColor: string
}

export default (siteVariables): EmbedVariables => ({
  width: undefined,
  height: undefined,
  focusBorderColor: siteVariables.colors.primary[500],
})
