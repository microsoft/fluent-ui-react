import { AvatarVariables } from '../../../teams/components/Avatar/avatarVariables'
import { Partial } from 'types/utils'

export default (siteVariables: any): Partial<AvatarVariables> => ({
  statusBorderColor: siteVariables.black,
})
