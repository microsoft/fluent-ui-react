import { AttachmentVariables } from '../../../teams/components/Attachment/attachmentVariables'

export default (siteVariables: any): Partial<AttachmentVariables> => ({
  textColor: siteVariables.colors.grey[50],
  textColorHover: siteVariables.colors.grey[50],

  backgroundColor: siteVariables.gray600,
  borderColor: siteVariables.gray850,
  boxShadow: siteVariables.shadowLevel1,
})
