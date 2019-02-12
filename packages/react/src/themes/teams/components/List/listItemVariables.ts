import { pxToRem } from '../../../../lib'

export default siteVariables => ({
  minHeight: pxToRem(48),
  paddingLeft: pxToRem(20),
  paddingRight: pxToRem(18),
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
  selectableFocusHoverColor: siteVariables.white,
  selectableFocusHoverBackgroundColor: siteVariables.brand08,
  selectedColor: siteVariables.black,
  selectedBackgroundColor: siteVariables.gray10,
  selectedFocusOutlineColor: siteVariables.brand,
})
