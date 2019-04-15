import { ChatMessageVariables } from '../../../teams/components/Chat/chatMessageVariables'

export default (siteVars: any): Partial<ChatMessageVariables> => {
  return {
    backgroundColor: siteVars.gray10,
    backgroundColorMine: siteVars.colors.primary[900],
    color: siteVars.colors.white,
    contentFocusOutlineColor: siteVars.brand,
  }
}
