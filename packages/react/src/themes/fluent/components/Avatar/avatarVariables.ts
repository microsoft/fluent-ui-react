export interface AvatarVariables {
  avatarBorderColor: string
  avatarBorderWidth: number
  statusBorderColor: string
  statusBorderWidth: number
}

export default (siteVariables): AvatarVariables => ({
  avatarBorderColor: '',
  avatarBorderWidth: 0,
  statusBorderColor: siteVariables.bodyBackground,
  statusBorderWidth: 2,
})
