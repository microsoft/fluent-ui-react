import { pxToRem } from '../../../../lib'

export default siteVars => ({
  paddingLeft: pxToRem(20),
  paddingRight: pxToRem(18),
  columnGap: pxToRem(8),

  height: pxToRem(48),

  // Header
  // TODO: prod app uses 17.5px here, it should be 16px per the design guide!
  headerLineHeight: siteVars.lineHeightSmall,

  // Header Media
  headerMediaColor: siteVars.mutedTextColor,
  headerMediaFontSize: siteVars.fontSizeSmall,
  // TODO: prod app uses 17.5px here, it should be 16px per the design guide!
  headerMediaLineHeight: siteVars.lineHeightSmall,

  // Content
  contentColor: siteVars.mutedTextColor,
  contentFontSize: siteVars.fontSizeSmall,
  contentLineHeight: siteVars.lineHeightSmall,
})
