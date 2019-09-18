import { ChatMessageVariables } from '../../../teams/components/Chat/chatMessageVariables'

export default (siteVars: any): Partial<ChatMessageVariables> => {
  return {
    backgroundColor: siteVars.colors.grey[600],
    backgroundColorMine: siteVars.colors.brand[900],
    color: siteVars.colors.white,
    hasMentionNubbinColor: siteVars.colors.orange[300],
    isImportantColor: siteVars.colors.red[300],
  }
}
