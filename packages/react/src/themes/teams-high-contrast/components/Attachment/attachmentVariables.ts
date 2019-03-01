import { AttachmentVariables } from '../../../teams/components/Attachment/AttachmentVariables'

export default (siteVariables: any): Partial<AttachmentVariables> => {
  return {
    border: `1px solid ${siteVariables.white}`,
    backgroundColor: siteVariables.black,
    backgroundColorHover: siteVariables.accessibleYellow,
    textColor: siteVariables.white,
    textColorHover: siteVariables.black,
    boxShadow: '',

    actionColorContrastOverride: 'black',

    progressColor: siteVariables.accessibleGreen,
    progressHeight: 6,

    focusOutlineColor: siteVariables.accessibleYellow,
  }
}
