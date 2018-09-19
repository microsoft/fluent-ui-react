export interface IChatMessageVariables {
  messageWidth: string
  messageColor: string
  messageColorMine: string
}

export default (siteVars): IChatMessageVariables => ({
  messageWidth: '80%',
  messageColor: siteVars.white,
  messageColorMine: '#E0E0ED',
})
