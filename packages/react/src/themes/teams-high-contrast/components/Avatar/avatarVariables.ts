import { AvatarVariables } from '../../../teams/components/Avatar/avatarVariables'

export default (siteVariables: any): Partial<AvatarVariables> => ({
  avatarBorderColor: siteVariables.white,
  avatarBorderWidth: '2px',
  statusBorderColor: siteVariables.black,
})
