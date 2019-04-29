import { ChatMessageVariables } from '../../../teams/components/Chat/chatMessageVariables'

export default (siteVars: any): Partial<ChatMessageVariables> => {
  return {
    // grey10?
    backgroundColor: siteVars.colors.grey[600],
    backgroundColorMine: siteVars.colors.primary[900],
    authorColor: siteVars.colors.grey[250],
    contentColor: siteVars.colors.white,
    color: siteVars.colors.white,
    contentFocusOutlineColor: siteVars.colors.primary[600],
    hasMentionNubbinColor: siteVars.colors.orange[300],
    isImportantColor: siteVars.colors.red[300],
  }
}
