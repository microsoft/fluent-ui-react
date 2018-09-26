export type AttachmentVariables = {
  padding: number
  iconSpace: number

  backgroundColor: string
  backgroundColorHover: string
  textColor: string

  progressColor: string
  progressHeight: number

  headerFontSize: string
  headerFontWeight: number
  headerLineHeight: number

  descriptionFontSize: string
  descriptionFontWeight: number
  descriptionLineHeight: number
}

export default siteVariables => ({
  padding: 8,
  iconSpace: 12,

  backgroundColor: siteVariables.gray09,
  backgroundColorHover: siteVariables.gray08,
  textColor: siteVariables.black,

  progressColor: siteVariables.green,
  progressHeight: 4,

  headerFontSize: siteVariables.fontSizeMedium,
  headerFontWeight: siteVariables.fontWeightSemibold,
  headerLineHeight: siteVariables.lineHeightSmall,

  descriptionFontSize: siteVariables.fontSizeSmall,
  descriptionFontWeight: siteVariables.fontWeightRegular,
  descriptionLineHeight: siteVariables.lineHeightSmall,
})
