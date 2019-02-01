import { AvatarVariables } from '../../../teams/components/Avatar/avatarVariables'

export default (siteVariables: any): Partial<AvatarVariables> => ({
  avatarBorderColor: siteVariables.white,
  avatarBorderWidth: 2,
  statusBorderColor: siteVariables.black,
})
