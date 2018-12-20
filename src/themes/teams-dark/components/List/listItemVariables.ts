export default siteVariables => ({
  // Header
  // TODO: prod app uses 17.5px here, it should be 16px per the design guide!
  headerLineHeight: siteVariables.lineHeightSmall,
  headerFontSize: siteVariables.fontSizes.medium,

  // Header Media
  headerMediaFontSize: siteVariables.fontSizes.small,
  // TODO: prod app uses 17.5px here, it should be 16px per the design guide!
  headerMediaLineHeight: siteVariables.lineHeightSmall,

  // Content
  contentFontSize: siteVariables.fontSizes.small,
  contentLineHeight: siteVariables.lineHeightSmall,

  // Selectable
  selectableFocusHoverColor: siteVariables.black,
  selectableFocusHoverBackgroundColor: siteVariables.brand02,
  selectedColor: siteVariables.black,
  selectedBackgroundColor: siteVariables.gray02,
})
