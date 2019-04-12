import { ChatMessageVariables } from '../../../teams/components/Chat/chatMessageVariables'

export default (siteVars: any): Partial<ChatMessageVariables> => {
  return {
    backgroundColor: siteVars.colors.grey[600],
    backgroundColorMine: siteVars.colors.primary[900],
    color: siteVars.colors.white,
    contentFocusOutlineColor: siteVars.colors.primary[600],
    timestampColorMine: siteVars.colors.grey[250],
  }
}
