export interface IChatVariables {
  backgroundColor: string
}

export default (siteVars): IChatVariables => ({
  backgroundColor: siteVars.gray10,
})
