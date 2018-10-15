export default siteVariables => ({
  // Root
  backgroundColor: siteVariables.brand,
  color: siteVariables.white,
  // Header
  // TODO: prod app uses 17.5px here, it should be 16px per the design guide!
  headerLineHeight: siteVariables.lineHeightSmall,
  headerFontSize: siteVariables.fontSizes.medium,

  // Header Media
  headerMediaColor: siteVariables.gray02,
  headerMediaFontSize: siteVariables.fontSizes.small,
  // TODO: prod app uses 17.5px here, it should be 16px per the design guide!
  headerMediaLineHeight: siteVariables.lineHeightSmall,

  // Content
  contentColor: siteVariables.gray02,
  contentFontSize: siteVariables.fontSizes.small,
  contentLineHeight: siteVariables.lineHeightSmall,
})
