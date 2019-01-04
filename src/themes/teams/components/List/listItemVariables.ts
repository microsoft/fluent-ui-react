export interface ListItemVariables {
  headerLineHeight: string
  headerFontSize: string

  // Header Media
  headerMediaFontSize: string
  // TODO: prod app uses 17.5px here, it should be 16px per the design guide!
  headerMediaLineHeight: string

  // Content
  contentFontSize: string
  contentLineHeight: string

  // Selectable
  selectableFocusHoverColor: string
  selectableFocusHoverBackgroundColor: string
  selectedColor: string
  selectedBackgroundColor: string
}

export default (siteVariables: any): ListItemVariables => {
  return {
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
    selectableFocusHoverColor: siteVariables.white,
    selectableFocusHoverBackgroundColor: siteVariables.brand08,
    selectedColor: siteVariables.black,
    selectedBackgroundColor: siteVariables.gray10,
  }
}
