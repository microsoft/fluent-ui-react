export interface IChatMessageVariables {
  messageWidth: string
  messageColor: string
  messageColorMine: string
}

export default (): IChatMessageVariables => ({
  messageWidth: '80%',
  messageColor: 'rgba(0,0,0,0.1)',
  messageColorMine: '#E0E0ED',
})
