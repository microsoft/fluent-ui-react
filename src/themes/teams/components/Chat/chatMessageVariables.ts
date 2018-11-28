export interface ChatMessageVariables {
  messageWidth: string
  messageColor: string
  messageColorMine: string
  avatar: { statusBorderColor: string }
  messageBody: { focusOutlineColor: string }
}

export default (siteVars): ChatMessageVariables => ({
  messageWidth: '80%',
  messageColor: siteVars.white,
  messageColorMine: '#E0E0ED',
  avatar: {
    statusBorderColor: siteVars.gray10,
  },
  messageBody: { focusOutlineColor: siteVars.brand },
})
