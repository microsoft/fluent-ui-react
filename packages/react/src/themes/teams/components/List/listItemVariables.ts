import { pxToRem } from '../../../../lib'

export interface ListItemVariables {
  minHeight: string
  rootPadding: string

  headerLineHeight: string
  headerFontSize: string

  // Header Media
  headerMediaFontSize: string
  // TODO: prod app uses 17.5px here, it should be 16px per the design guide!
  headerMediaLineHeight: string

  // Content
  contentFontSize: string
  contentLineHeight: string

  // Content media
  contentMediaFontSize: string
  contentMediaLineHeight: string

  // Selectable
  selectableFocusHoverColor: string
  selectableFocusHoverBackgroundColor: string
  selectedColor: string
  selectedBackgroundColor: string
  selectedFocusOutlineColor: string
}

export default (siteVariables: any): ListItemVariables => {
  return {
    minHeight: pxToRem(48),
    rootPadding: `0 ${pxToRem(18)} 0 ${pxToRem(20)}`,

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

    // Content Media
    contentMediaFontSize: siteVariables.fontSizes.small,
    contentMediaLineHeight: siteVariables.lineHeightSmall,

    // Selectable
    selectableFocusHoverColor: siteVariables.colors.white,
    selectableFocusHoverBackgroundColor: siteVariables.brand08,
    selectedColor: siteVariables.bodyColor,
    selectedBackgroundColor: siteVariables.gray10,
    selectedFocusOutlineColor: siteVariables.colors.primary[500],
  }
}
