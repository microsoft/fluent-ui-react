import { ChatMessageVariables } from '../../../teams/components/Chat/chatMessageVariables'

export default (siteVars: any): Partial<ChatMessageVariables> => {
  return {
    backgroundColor: siteVars.gray10,
    backgroundColorMine: '#3B3C54',
    color: siteVars.white,
    contentFocusOutlineColor: siteVars.brand,
  }
}
