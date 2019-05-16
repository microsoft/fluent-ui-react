import { AttachmentVariables } from '../../../teams/components/Attachment/attachmentVariables'

export default (siteVariables: any): Partial<AttachmentVariables> => ({
  textColor: siteVariables.colors.white,
  textColorHover: siteVariables.colors.white,

  backgroundColor: siteVariables.colors.grey[600],
  borderColor: siteVariables.colors.grey[850],
  boxShadow: siteVariables.shadowLevel1,
})
