import { pxToRem } from '../../../../lib'

export type AttachmentVariables = {
  padding: string
  iconSpace: string

  border: string
  borderRadius: string
  backgroundColor: string
  backgroundColorHover: string
  textColor: string
  textColorHover: string
  boxShadow: string

  actionColorContrastOverride: string

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

export default (siteVariables: any): AttachmentVariables => {
  return {
    padding: pxToRem(8),
    iconSpace: pxToRem(12),

    border: `1px solid ${siteVariables.gray08}`,
    borderRadius: '3px',
    backgroundColor: siteVariables.gray10,
    backgroundColorHover: siteVariables.gray08,
    textColor: siteVariables.colors.grey[900],
    textColorHover: siteVariables.colors.grey[900],
    boxShadow: siteVariables.shadowLevel1,

    actionColorContrastOverride: '',

    progressColor: siteVariables.naturalColors.lightGreen[900],
    progressHeight: 4,

    headerFontSize: siteVariables.fontSizes.medium,
    headerFontWeight: siteVariables.fontWeightSemibold,
    headerLineHeight: siteVariables.lineHeightMedium,

    descriptionFontSize: siteVariables.fontSizes.small,
    descriptionFontWeight: siteVariables.fontWeightRegular,
    descriptionLineHeight: siteVariables.lineHeightSmall,

    focusOutlineColor: siteVariables.colors.primary[500],
  }
}
