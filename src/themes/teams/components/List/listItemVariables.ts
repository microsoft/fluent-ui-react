export default siteVariables => ({
  // Header
  // TODO: prod app uses 17.5px here, it should be 16px per the design guide!
  headerLineHeight: siteVariables.lineHeightSmall,
  headerFontSize: siteVariables.fontSizeBase,

  // Header Media
  headerMediaColor: siteVariables.mutedTextColor,
  headerMediaFontSize: siteVariables.fontSizeSmall,
  // TODO: prod app uses 17.5px here, it should be 16px per the design guide!
  headerMediaLineHeight: siteVariables.lineHeightSmall,

  // Content
  contentColor: siteVariables.mutedTextColor,
  contentFontSize: siteVariables.fontSizeSmall,
  contentLineHeight: siteVariables.lineHeightSmall,
})
