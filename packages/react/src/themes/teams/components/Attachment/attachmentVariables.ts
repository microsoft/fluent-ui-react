import { pxToRem } from '../../../../lib'

export type AttachmentVariables = {
  padding: string
  iconSpace: string

  borderColor: string
  borderRadius: string
  backgroundColor: string
  backgroundColorHover: string
  textColor: string
  textColorHover: string
  boxShadow: string

  progressColor: string
  progressHeight: number

  headerFontSize: string
  headerFontWeight: number
  headerLineHeight: number

  descriptionFontSize: string
  descriptionFontWeight: number
  descriptionLineHeight: number
}

export default (siteVariables: any): AttachmentVariables => ({
  padding: `${pxToRem(7)} ${pxToRem(3)} ${pxToRem(7)} ${pxToRem(11)}`, // padding set to 1px less to account for 1px border
  iconSpace: pxToRem(12),
  borderColor: siteVariables.gray08,
  borderRadius: pxToRem(3),
  backgroundColor: siteVariables.gray10,
  backgroundColorHover: siteVariables.gray08,
  textColor: siteVariables.colors.grey[900],
  textColorHover: siteVariables.colors.grey[900],
  boxShadow: siteVariables.shadowLevel1,

  progressColor: siteVariables.naturalColors.lightGreen[900],
  progressHeight: 4,

  headerFontSize: siteVariables.fontSizes.medium,
  headerFontWeight: siteVariables.fontWeightSemibold,
  headerLineHeight: siteVariables.lineHeightMedium,

  descriptionFontSize: siteVariables.fontSizes.small,
  descriptionFontWeight: siteVariables.fontWeightRegular,
  descriptionLineHeight: siteVariables.lineHeightSmall,
})
