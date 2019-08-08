export interface EmbedVariables {
  controlColor: string
  controlBackgroundColor: string
  width: string
  height: string
  focusBorderColor: string
  backgroundColor: string
}

export default (siteVariables): EmbedVariables => ({
  controlColor: siteVariables.bodyBackground,
  controlBackgroundColor: 'rgba(0,0,0,.25)',

  width: undefined,
  height: undefined,
  focusBorderColor: siteVariables.colors.brand[500],
  backgroundColor: siteVariables.colorScheme.brand.background,
})
