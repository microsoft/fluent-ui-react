import { pxToRem } from '../../../../lib'

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

  focusOutlineColor: string
}

export default siteVariables => ({
  padding: pxToRem(8),
  iconSpace: pxToRem(12),

  backgroundColor: siteVariables.colors.grey[150],
  backgroundColorHover: siteVariables.colors.grey[200],
  textColor: siteVariables.colors.grey[750],

  progressColor: siteVariables.colors.green[200],
  progressHeight: 4,

  headerFontSize: siteVariables.fontSizes.medium,
  headerFontWeight: siteVariables.fontWeightSemibold,
  headerLineHeight: siteVariables.lineHeightSmall,

  descriptionFontSize: siteVariables.fontSizes.small,
  descriptionFontWeight: siteVariables.fontWeightRegular,
  descriptionLineHeight: siteVariables.lineHeightSmall,

  focusOutlineColor: siteVariables.colors.primary[600],
})
