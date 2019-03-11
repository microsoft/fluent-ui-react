import { AttachmentVariables } from '../../../teams/components/Attachment/attachmentVariables'

export default (siteVariables: any): Partial<AttachmentVariables> => {
  return {
    textColor: siteVariables.colors.grey[50],
    textColorHover: siteVariables.colors.grey[50],
  }
}
