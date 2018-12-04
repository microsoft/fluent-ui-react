export interface ChatMessageVariables {
  messageWidth: string
  messageColor: string
  messageColorMine: string
  content: { focusOutlineColor: string }
}

export default (siteVars): ChatMessageVariables => ({
  messageWidth: '80%',
  messageColor: siteVars.white,
  messageColorMine: '#E0E0ED',
  content: { focusOutlineColor: siteVars.brand },
})
