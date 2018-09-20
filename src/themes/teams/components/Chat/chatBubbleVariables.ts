export interface IChatBubbleVariables {
  messageWidth: string
  messageColor: string
  messageColorMine: string
  avatar: { statusBorderColor: string }
}

export default (siteVars): IChatBubbleVariables => ({
  messageWidth: '80%',
  messageColor: siteVars.white,
  messageColorMine: '#E0E0ED',
  avatar: {
    statusBorderColor: siteVars.gray10,
  },
})
