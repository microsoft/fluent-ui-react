export interface IAvatarVariables {
  statusBorderColor: string
  statusBorderWidth: number
}

export default siteVariables => ({
  statusBorderColor: siteVariables.bodyBackground,
  statusBorderWidth: 2,
})
