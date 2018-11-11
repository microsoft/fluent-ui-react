import { StatusVariables } from '../Status/statusVariables'

export interface AvatarVariables {
  status: Partial<StatusVariables>
}

export default (siteVariables): AvatarVariables => ({
  status: {
    borderColor: siteVariables.bodyBackground,
    borderWidth: 2,
  },
})
