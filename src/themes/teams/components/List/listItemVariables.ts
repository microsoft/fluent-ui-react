export default siteVariables => ({
  // Header
  // TODO: prod app uses 17.5px here, it should be 16px per the design guide!
  headerLineHeight: siteVariables.lineHeightSmall,
  headerFontSize: siteVariables.fontSizes.md,

  // Header Media
  headerMediaColor: siteVariables.gray02,
  headerMediaFontSize: siteVariables.fontSizes.sm,
  // TODO: prod app uses 17.5px here, it should be 16px per the design guide!
  headerMediaLineHeight: siteVariables.lineHeightSmall,

  // Content
  contentColor: siteVariables.gray02,
  contentFontSize: siteVariables.fontSizes.sm,
  contentLineHeight: siteVariables.lineHeightSmall,
})
