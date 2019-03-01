import { AttachmentVariables } from '../../../teams/components/Attachment/AttachmentVariables'

export default (siteVariables: any): Partial<AttachmentVariables> => {
  return {
    textColor: siteVariables.colors.grey[50],
    textColorHover: siteVariables.colors.grey[50],
  }
}
