export interface AvatarVariables {
  statusBorderColor: string
  statusBorderWidth: number
}

export default (siteVariables): AvatarVariables => ({
  statusBorderColor: siteVariables.bodyBackground,
  statusBorderWidth: 2,
})
