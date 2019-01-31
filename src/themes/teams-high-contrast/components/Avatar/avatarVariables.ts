import { AvatarVariables } from '../../../teams/components/Avatar/avatarVariables'
import { Partial } from 'types/utils'

export default (siteVariables: any): Partial<AvatarVariables> => ({
  avatarBorderColor: siteVariables.white,
  avatarBorderWidth: 2,
  statusBorderColor: siteVariables.black,
})
