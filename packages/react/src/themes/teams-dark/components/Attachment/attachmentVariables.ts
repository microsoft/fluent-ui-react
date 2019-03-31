import { AttachmentVariables } from '../../../teams/components/Attachment/attachmentVariables'

export default (siteVariables: any): Partial<AttachmentVariables> => ({
  textColor: siteVariables.colors.grey[50],
  textColorHover: siteVariables.colors.grey[50],
  borderColor: 'rgba(0, 0, 0, .05)',
  boxShadow: siteVariables.shadowLevel1,
})
