import { pxToRem } from '../../../../lib'
import { AttachmentVariables } from '../../../teams/components/Attachment/AttachmentVariables'

export default (siteVariables: any): Partial<AttachmentVariables> => {
  return {
    padding: pxToRem(8),
    iconSpace: pxToRem(12),

    border: `1px solid ${siteVariables.white}`,
    borderRadius: '3px',
    backgroundColor: siteVariables.black,
    backgroundColorHover: siteVariables.accessibleYellow,
    textColor: siteVariables.white,
    textColorHover: siteVariables.black,
    boxShadow: '',

    actionColorContrastOverride: 'black',

    progressColor: siteVariables.accessibleGreen,
    progressHeight: 6,

    headerFontSize: siteVariables.fontSizes.medium,
    headerFontWeight: siteVariables.fontWeightSemibold,
    headerLineHeight: siteVariables.lineHeightMedium,

    descriptionFontSize: siteVariables.fontSizes.small,
    descriptionFontWeight: siteVariables.fontWeightRegular,
    descriptionLineHeight: siteVariables.lineHeightSmall,

    focusOutlineColor: siteVariables.colors.primary[500],
  }
}
