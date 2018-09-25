export default siteVariables => ({
  // Header
  // TODO: prod app uses 17.5px here, it should be 16px per the design guide!
  headerLineHeight: siteVariables.lineHeightSmall,
  headerFontSize: siteVariables.fontSizeMedium,

  // Header Media
  headerMediaFontSize: siteVariables.fontSizeSmall,
  // TODO: prod app uses 17.5px here, it should be 16px per the design guide!
  headerMediaLineHeight: siteVariables.lineHeightSmall,

  // Content
  contentFontSize: siteVariables.fontSizeSmall,
  contentLineHeight: siteVariables.lineHeightSmall,

  // Selection
  selectionHoverColor: siteVariables.white,
  selectionHoverBackgroundColor: siteVariables.brand08,
})
